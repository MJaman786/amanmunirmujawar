import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";

interface Prop {
    label?: string;
    icon?: React.ReactNode;
    type?: "text" | "email" | "password" | "number" | "checkbox";
    name: string; // important for formik
    placeholder?: string;
    inputClass?: string;
    iconClass?: string;
    value?: string | number;
    // defaultValue?: string | number;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    touched?: boolean;
    error?: string;
    disabled?: boolean;
}

export default function InputField({
    label,
    icon,
    type = "text",
    name,
    placeholder,
    inputClass = "",
    iconClass = "",
    value,
    // defaultValue,
    checked,
    onChange,
    onBlur,
    touched,
    error,
    disabled
}: Prop) {
    const showError = touched && error;

    const [isPassword, setPassword] = useState<boolean>(true);
    const inputType =
        type === "password" ? (isPassword ? "password" : "text") : type;
    const handleToggle = () => {
        inputType === "password" ? setPassword(false) : setPassword(true);
    };

    if (type === "checkbox") {
        return (
            <div className="flex items-center gap-3 ml-1">
                <input
                    name={name}
                    type={inputType}
                    checked={checked}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-4 h-4 rounded border-[var(--hairline)] bg-[var(--canvas-elevated)] accent-[var(--link)] focus:ring-[var(--link)] cursor-pointer transition-colors"
                />
                <label
                    htmlFor="keep-signed"
                    className="text-xs font-semibold text-[var(--mute)] cursor-pointer hover:text-[var(--ink)] transition-colors"
                >
                    {label}
                </label>
            </div>
        );
    }

    return (
        <div className="space-y-1.5 font-sans">
            {/* ✅ Label */}
            {label && (
                <label className="text-[11px] font-bold text-[var(--mute)] uppercase tracking-widest ml-1">
                    {label}
                </label>
            )}

            {/* ✅ Input Wrapper */}
            <div className="relative group">
                {/* ✅ Icon (optional) */}
                {icon && (
                    <div
                        className={`absolute left-4 top-1/2 -translate-y-1/2 text-[var(--faint)] group-focus-within:text-[var(--link)] transition-colors ${iconClass}`}
                    >
                        {icon}
                    </div>
                )}

                {/* ✅ Input */}
                <input
                    name={name}
                    type={inputType}
                    value={value}
                    // defaultValue={defaultValue}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full h-11 bg-[var(--canvas-elevated)] border 
                        ${showError ? "border-[#ee0000]" : "border-[var(--hairline)] hover:border-[var(--mute)]"} 
                        rounded-xl ${icon ? "pl-12" : "pl-4"} ${type === "password" ? "pr-12" : "pr-4"} 
                        text-sm text-[var(--ink)] focus:outline-none focus:ring-2 
                        ${showError ? "focus:ring-[#ee0000]/20 focus:border-[#ee0000]" : "focus:ring-[var(--link)]/15 focus:border-[var(--link)]"} 
                        transition-all duration-150 placeholder:text-[var(--faint)] 
                        ${inputClass}
                    `}
                />

                {type === "password" && (
                    <div
                        onClick={handleToggle}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 text-[var(--faint)] hover:text-[var(--ink)] group-focus-within:text-[var(--link)] transition-colors cursor-pointer ${iconClass}`}
                    >
                        {isPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                    </div>
                )}
            </div>

            {/* ✅ Error Message */}
            {showError && (
                <p className="text-xs text-[#ee0000] font-medium ml-1">{error}</p>
            )}
        </div>
    );
}