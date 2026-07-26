import React from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location?: string;
  duration: string;
  description?: string;
}

// ── Reusable ExperienceCard Sub-Component ─────────────────────────────────────
export function ExperienceCard({
  role,
  organization,
  location,
  duration,
  description,
}: ExperienceItem) {
  return (
    <div className="pricing-card bg-[var(--canvas-elevated)] border border-[var(--hairline)] rounded-2xl p-6 flex flex-col gap-3 shadow-2xs hover:border-[var(--link)]/40 transition-colors">
      <div className="exp-header flex flex-col sm:flex-row justify-between items-start gap-2">
        <div>
          <h3 className="heading-md text-base font-semibold text-[var(--ink)]">
            {role}
          </h3>
          <p className="body-md text-sm text-[var(--mute)]">
            {organization}
            {location && ` • ${location}`}
          </p>
        </div>
        <p className="mono-eyebrow font-mono text-xs text-[var(--mute)] shrink-0">
          {duration}
        </p>
      </div>
      {description && (
        <p className="body-md text-sm text-[var(--body)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

// ── Career & Education Data Array ─────────────────────────────────────────────
export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "mitroz",
    role: "ReactJs Developer",
    organization: "Mitroz Technologies",
    location: "Pune, India",
    duration: "DEC 2025 — MAY 2026",
    description: `
      Developed and maintained 7+ production-ready full-stack applications using React.js, Node.js, Express.js, and MongoDB, implementing responsive interfaces, RESTful APIs, and scalable backend services.
      Worked in Agile teams to resolve production issues, perform code reviews, optimize application performance, and deliver high-quality features within deadlines
    `,
  },
  {
    id: "rego",
    role: "Trainee Software Engineer",
    organization: "Rego Digital Solutions",
    location: "Pune, India",
    duration: "JUN 2025 — DEC 2025",
    description: `
      Successfully delivered 2+ production client projects using React.js, Node.js, Express.js, and MongoDB in Agile/Scrum environments 
      Built responsive front-end components, developed backend APIs, optimized application performance, and resolved production issues.
    `
  },
  {
    id: "aicte-aws",
    role: "Cloud & Infrastructure Intern (AWS)",
    organization: "AICTE",
    location: "Remote",
    duration: "JAN 2024 — MAR 2024",
    description:
      "Provisioned and configured scalable cloud infrastructure on AWS (EC2, S3, RDS); designed VPC architectures and enforced IAM least-privilege security policies. Completed labs covering Lambda, CloudWatch, and CloudFormation.",
  },
  {
    id: "education-be",
    role: "B.E. in Information Technology",
    organization: "International Institute of Information Technology, Hinjewadi",
    location: "Pune, India",
    duration: "CGPA: 7.45 (FIRST CLASS)",
  },
  {
    id: "education-hsc",
    role: "HSC (Class XII)",
    organization: "Sant Tukaram English Medium School & Junior College",
    location: "Pune, India",
    duration: "SCORE: 88.67%",
  },
];

// ── Main Section Component ───────────────────────────────────────────────────
export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section-container max-w-[1100px] mx-auto py-12 lg:py-16 px-4 lg:px-8 border-t border-[var(--hairline)]"
    >
      {/* Section Header */}
      <div className="section-header mb-8 flex flex-col gap-1">
        <p className="mono-eyebrow font-mono text-xs font-medium uppercase tracking-wider text-[var(--mute)]">
          03 / CAREER & EDUCATION
        </p>
        <h2 className="heading-lg text-2xl lg:text-3xl font-semibold text-[var(--ink)] tracking-tight">
          Professional background.
        </h2>
      </div>

      {/* Experience List Iteration */}
      <div className="experience-list flex flex-col gap-4">
        {EXPERIENCE_DATA.map((item) => (
          <ExperienceCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}