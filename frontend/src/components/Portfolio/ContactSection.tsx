import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Copy, Check, CheckCircle2, MessageSquare } from "lucide-react";

import InputField from "../../components/Ui/Input";
import Button from "../../components/Ui/Buttons/modal.button";

// ── Yup Validation Schema (Following ProductModal Pattern) ─────────────────────
const contactValidationSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Maximum 100 characters allowed")
        .required("Your name is required"),
    email: Yup.string()
        .trim()
        .email("Please enter a valid email address")
        .required("Email address is required"),
    subject: Yup.string()
        .trim()
        .max(150, "Maximum 150 characters allowed")
        .nullable(),
    message: Yup.string()
        .trim()
        .min(10, "Message must be at least 10 characters")
        .max(2000, "Maximum 2000 characters allowed")
        .required("Message content is required"),
});

export default function ContactSection() {
    const [copied, setCopied] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const email = "amanmujawar064@gmail.com";

    // Copy Email Action
    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // ── Formik Implementation (Matching ProductModal Destructuring) ──────────────
    const { values, handleSubmit, handleChange, handleBlur, resetForm, errors, touched } = useFormik({
        initialValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
        validationSchema: contactValidationSchema,
        onSubmit: async (data) => {
            setIsPending(true);

            try {
                // Integrated with Web3Forms API for free email delivery to amanmujawar064@gmail.com
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY, // <--- Paste key here
                        name: data.name,
                        email: data.email,
                        subject: data.subject || `Portfolio Inquiry from ${data.name}`,
                        message: data.message,
                    }),
                });

                const result = await response.json();
                if (result.success) {
                    setSubmitted(true);
                    resetForm();
                }
            } catch (err) {
                console.error("Message submission error:", err);
            } finally {
                setIsPending(false);
            }
        },
    });

    return (
        <section id="contact" className="cta-band border-t border-[var(--hairline)] py-16 lg:py-24 px-4 lg:px-8 bg-[var(--canvas)] flex justify-center font-sans">
            <div className="container max-w-[1100px] text-center flex flex-col items-center">
                
                {/* Section Header */}
                <p className="mono-eyebrow font-mono text-xs font-medium uppercase tracking-wider text-[var(--mute)] mb-2">
                    04 / LET'S CONNECT
                </p>
                <h2 className="display-xl text-3xl lg:text-5xl font-semibold tracking-tight text-[var(--ink)]">
                    Ready to build high-performance software.
                </h2>
                <p className="body-lg text-base lg:text-lg text-[var(--body)] my-4 max-w-xl">
                    Currently open to software development opportunities in product-driven engineering teams.
                </p>

                {/* Email Pill Badge */}
                <div className="mb-10 inline-flex items-center gap-2 bg-[var(--canvas-elevated)] border border-[var(--hairline)] rounded-full px-4 py-2 shadow-xs">
                    <Mail size={16} className="text-[var(--link)] shrink-0" />
                    <span className="text-xs font-mono font-medium text-[var(--ink)]">{email}</span>
                    <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="ml-2 p-1 text-[var(--mute)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                        title="Copy Email"
                    >
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                </div>

                {/* Main Form Container */}
                <div className="w-full max-w-xl bg-[var(--canvas-elevated)] border border-[var(--hairline)] rounded-2xl p-6 lg:p-8 text-left shadow-xs transition-colors">
                    {submitted ? (
                        <div className="py-10 flex flex-col items-center text-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                <CheckCircle2 size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--ink)]">Message Sent!</h3>
                            <p className="text-sm text-[var(--body)] max-w-md">
                                Thank you for reaching out. I've received your email and will respond as soon as possible.
                            </p>
                            <Button
                                type="button"
                                label="Send Another Message"
                                varient="clear"
                                onClick={() => setSubmitted(false)}
                            />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            
                            {/* Readymade InputFields Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField
                                    type="text"
                                    label="Your Name *"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="John Doe"
                                    error={errors.name}
                                    touched={touched.name}
                                    disabled={isPending}
                                />

                                <InputField
                                    type="email"
                                    label="Your Email *"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="john@example.com"
                                    error={errors.email}
                                    touched={touched.email}
                                    disabled={isPending}
                                />
                            </div>

                            {/* Readymade InputField for Subject */}
                            <InputField
                                type="text"
                                label="Subject"
                                name="subject"
                                value={values.subject}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Project Inquiry / Job Opportunity"
                                error={errors.subject}
                                touched={touched.subject}
                                disabled={isPending}
                            />

                            {/* Textarea for Message Brief (Matching ProductModal Description Field) */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[12px] font-bold text-[var(--mute)] tracking-wider uppercase ml-1 flex items-center gap-1">
                                    <MessageSquare size={13} className="text-[var(--mute)]" /> Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={values.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Hi Aman, I'd like to discuss a project..."
                                    rows={4}
                                    disabled={isPending}
                                    className={`w-full text-xs font-medium px-4 py-3 rounded-xl border bg-[var(--canvas-elevated)] focus:outline-none transition-all resize-none custom-scrollbar ${
                                        errors.message && touched.message
                                            ? "border-[#ee0000] focus:border-[#ee0000] focus:ring-1 focus:ring-[#ee0000]"
                                            : "border-[var(--hairline)] hover:border-[var(--mute)] focus:border-[var(--link)] focus:ring-1 focus:ring-[var(--link)]"
                                    } text-[var(--ink)] placeholder:text-[var(--faint)]`}
                                />
                                {errors.message && touched.message && (
                                    <span className="text-[11px] font-medium text-[#ee0000] px-1">
                                        {errors.message}
                                    </span>
                                )}
                            </div>

                            {/* Readymade Button Component */}
                            <div className="pt-2 flex items-center justify-end">
                                <Button
                                    type="submit"
                                    varient="submit"
                                    label="Send Message"
                                    loadingLabel="Sending..."
                                    disabled={isPending}
                                    isLoading={isPending}
                                    className="w-full"
                                />
                            </div>
                        </form>
                    )}
                </div>

            </div>
        </section>
    );
}