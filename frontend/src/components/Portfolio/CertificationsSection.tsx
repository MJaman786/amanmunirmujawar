import React, { useState } from "react";
import { Award, ExternalLink, ShieldCheck, Eye, X, Calendar } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface CertificationItem {
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialId?: string;
    credentialUrl?: string;
    imageUrl: string;
    skills: string[];
}

export interface CertificationCategory {
    title: string;
    certifications: CertificationItem[];
}

// ── Image Modal / Lightbox Sub-Component ─────────────────────────────────────
function CertificateModal({
    isOpen,
    onClose,
    title,
    imageUrl,
    issuer,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    imageUrl: string;
    issuer: string;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative z-10 w-full max-w-3xl bg-[var(--canvas-elevated)] border border-[var(--hairline)] rounded-2xl overflow-hidden shadow-2xl flex flex-col">

                {/* Modal Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--hairline)] bg-[var(--canvas-elevated)]">
                    <div>
                        <h3 className="text-sm font-bold text-[var(--ink)]">{title}</h3>
                        <p className="text-[11px] font-mono text-[var(--mute)]">{issuer}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--hairline-soft)] rounded-lg transition-colors cursor-pointer"
                        title="Close Preview"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Modal Full Image Viewport */}
                <div className="p-3 bg-black/40 flex items-center justify-center max-h-[75vh] overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={`${title} full certificate`}
                        className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
}

// ── Reusable CertificateCard Sub-Component ────────────────────────────────────
export function CertificateCard({
    title,
    issuer,
    date,
    credentialId,
    credentialUrl,
    imageUrl,
    skills,
}: CertificationItem) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    return (
        <>
            <div className="certificate-card bg-[var(--canvas-elevated)] border border-[var(--hairline)] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[var(--link)]/50 hover:shadow-lg transition-all duration-300 group">

                {/* Top Image Preview Banner */}
                <div
                    onClick={() => setIsPreviewOpen(true)}
                    className="relative w-full h-44 bg-[var(--canvas)] border-b border-[var(--hairline)] overflow-hidden cursor-pointer group/img"
                >
                    <img
                        src={imageUrl}
                        alt={`${title} certificate`}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white font-mono text-xs font-semibold backdrop-blur-[2px]">
                        <Eye size={16} />
                        <span>Click to Inspect</span>
                    </div>

                    {/* Issuer Badge Overlay */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] font-bold">
                        {issuer}
                    </div>
                </div>

                {/* Card Body Details */}
                <div className="p-5 flex flex-col gap-3.5 flex-1">

                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h4 className="text-base font-bold text-[var(--ink)] leading-snug group-hover:text-[var(--link)] transition-colors">
                                {title}
                            </h4>
                            <p className="text-xs font-mono text-[var(--mute)] mt-1 flex items-center gap-1.5">
                                <Calendar size={12} /> Issued {date}
                            </p>
                        </div>

                        <div className="p-2 rounded-xl bg-[var(--hairline-soft)] border border-[var(--hairline)] text-[var(--link)] shrink-0">
                            <Award size={18} />
                        </div>
                    </div>

                    {/* Credential Verification ID */}
                    {credentialId && (
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--mute)] bg-[var(--hairline-soft)]/50 px-2.5 py-1.5 rounded-lg border border-[var(--hairline)] w-fit">
                            <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                            <span>ID: <strong className="text-[var(--ink)]">{credentialId}</strong></span>
                        </div>
                    )}

                    {/* Key Competencies Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-md bg-[var(--hairline-soft)] text-[var(--ink)] border border-[var(--hairline)]"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Action Links Footer */}
                    <div className="pt-3 border-t border-[var(--hairline-soft)] flex items-center justify-between mt-2 font-mono text-xs">
                        <button
                            type="button"
                            onClick={() => setIsPreviewOpen(true)}
                            className="text-[var(--mute)] hover:text-[var(--ink)] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                            <Eye size={13} />
                            <span>Quick Preview</span>
                        </button>

                        {credentialUrl && (
                            <a
                                href={credentialUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[var(--link)] font-semibold cursor-pointer"
                            >
                                <span>Verify Credential</span>
                                <ExternalLink size={12} />
                            </a>
                        )}
                    </div>

                </div>
            </div>

            {/* Lightbox Modal */}
            <CertificateModal
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                title={title}
                imageUrl={imageUrl}
                issuer={issuer}
            />
        </>
    );
}

// ── Complete Certifications Data Array ────────────────────────────────────────
// ── Certifications Array (Reverse-Chronological: Newest First) ───────────────
export const CERTIFICATION_CATEGORIES: CertificationCategory[] = [
    {
        title: "// Official Credentials & Certifications",
        certifications: [
            {
                id: "huggingface-llm-fundamentals",
                title: "Fundamentals of LLMs (The LLM Course)",
                issuer: "Hugging Face",
                date: "AUG 2026",
                credentialUrl: "https://github.com/MJaman786/Certificates/blob/main/certificates/LLM_Fundamentals_Certicate.pdf",
                imageUrl: "/certificates/LLM_Fundamentals_Certicate.webp",
                skills: [
                    "Large Language Models",
                    "NLP",
                    "Transformers",
                    "Hugging Face",
                ],
            },
            {
                id: "huggingface-ai-agents",
                title: "Foundations of AI Agents",
                issuer: "Hugging Face",
                date: "AUG 2026",
                credentialUrl: "https://github.com/MJaman786/Certificates/blob/main/certificates/Ai_Agent_Fundamentals_Certificate.pdf",
                imageUrl: "/certificates/Ai_Agent_Fundamentals_Certificate.webp",
                skills: [
                    "AI Agents",
                    "Agent Architecture",
                    "Prompt Engineering",
                    "Hugging Face",
                ],
            },
            {
                id: "deloitte-data-analytics",
                title: "Data Analytics Job Simulation",
                issuer: "Deloitte / Forage",
                date: "JUN 2026",
                // credentialId: "6a36c04d61bbcba7740d4476",
                credentialUrl: "https://github.com/MJaman786/Certificates/blob/main/certificates/deloitte_Data_Analyrtics_completion_certificate.pdf",
                imageUrl: "/certificates/Deloitte_Data_Analytics_Certificate.png",
                skills: [
                    "Data Analysis",
                    "Forensic Technology",
                    "Data Visualization",
                    "Microsoft Excel",
                    "Tableau"
                ],
            },
            {
                id: "cisco-cybersecurity",
                title: "Introduction to Cybersecurity",
                issuer: "Cisco Networking Academy",
                date: "APR 2024",
                credentialUrl: "https://github.com/MJaman786/Certificates/blob/main/certificates/AmanMujawar-Introduction%20to%20-certificate_2.pdf",
                imageUrl: "/certificates/Cisco_Intro_to_CyberSecurity.png",
                skills: [
                    "Cybersecurity",
                    "Threat Detection",
                    "Network Vulnerability",
                    "Risk Defense",
                ],
            },
            {
                id: "aws-cloud-virtual-internship",
                title: "Cloud Virtual Internship (AWS Academy)",
                issuer: "AICTE EduSkills / AWS Academy",
                date: "MAR 2024",
                credentialId: "6c375a4450b15c793a730ce1f7f4967d",
                credentialUrl: "https://github.com/MJaman786/Certificates/blob/main/certificates/AWS%20Cloud%20Aman%20Munir%20Mujawar%20817941.pdf",
                imageUrl: "/certificates/Aicte_AWS_Cloud.png",
                skills: [
                    "AWS EC2",
                    "S3",
                    "RDS",
                    "Lambda",
                    "VPC Architecture",
                    "IAM Security",
                ],
            },
            {
                id: "acmegrade-aiml-internship",
                title: "AI & Machine Learning Internship Completion",
                issuer: "Acmegrade",
                date: "MAR 2024",
                credentialId: "AG124010896",
                credentialUrl: "https://github.com/MJaman786/Certificates/blob/main/certificates/Acmegrade%20Aman%20Munir%20Mujawar_Internship%20Completion.pdf",
                imageUrl: "/certificates/Ai_internship_certificate.png",
                skills: [
                    "Artificial Intelligence",
                    "Machine Learning",
                    "Model Training",
                    "Python",
                ],
            },
            {
                id: "acmegrade-aiml-training",
                title: "AI & Machine Learning Training Completion",
                issuer: "Acmegrade / Mood Indigo IIT Bombay",
                date: "FEB 2024",
                credentialId: "AGC2024010283",
                credentialUrl: "https://github.com/MJaman786/Certificates/blob/main/certificates/Acmegrade%20Aman%20Munir%20Mujawar_Training%20completion.pdf",
                imageUrl: "/certificates/Ai_training_certificate.png",
                skills: [
                    "Supervised Learning",
                    "Neural Networks",
                    "Data Preprocessing",
                    "Python",
                ],
            },
        ],
    },
];

// ── Main Section Component ───────────────────────────────────────────────────
export default function CertificationsSection() {
    return (
        <section
            id="certifications"
        >
            {/* Section Header */}
            <div className="section-header mb-8 flex flex-col gap-1">
                <p className="mono-eyebrow font-mono text-xs font-medium uppercase tracking-wider text-[var(--mute)]">
                    04 / CERTIFICATIONS & ACCOMPLISHMENTS
                </p>
                <h2 className="heading-lg text-2xl lg:text-3xl font-semibold text-[var(--ink)] tracking-tight">
                    Verified qualifications.
                </h2>
            </div>

            {/* Dynamic Category Iteration Loop */}
            {CERTIFICATION_CATEGORIES.map((category) => (
                <div key={category.title} className="skills-category-block mb-8">
                    <h3 className="skills-category-title font-mono text-xs font-medium text-[var(--mute)] uppercase tracking-wider mb-4">
                        {category.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {category.certifications.map((cert) => (
                            <CertificateCard key={cert.id} {...cert} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}