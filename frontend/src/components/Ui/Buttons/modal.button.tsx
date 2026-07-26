import React from "react";

interface ButtonProps {
    label: string;
    loadingLabel?: string;
    varient: "submit" | "cancel" | "clear";
    type?: "button" | "submit";
    isLoading?: boolean;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

export default function Button({
    label,
    loadingLabel,
    varient,
    type = "button",
    isLoading = false,
    onClick,
    className = "",
    disabled = false
}: ButtonProps) {
    const buttonVariant = {
        // Matches Geist Primary Ink token for main actions
        submit: "bg-[var(--primary)] text-[var(--on-primary)] hover:opacity-90 border border-transparent shadow-sm",

        // Vercel/Geist Red for destructive actions
        cancel: "bg-[#ee0000] hover:bg-[#c50000] text-white border border-transparent shadow-sm",

        // Clean hairline-bordered tile for secondary/clear actions
        clear: "bg-[var(--canvas-elevated)] hover:bg-[var(--hairline-soft)] text-[var(--ink)] border border-[var(--hairline)] shadow-sm",

        // Ghost variant for low-emphasis actions
        ghost: "bg-transparent hover:bg-[var(--hairline-soft)] text-[var(--body)] border border-[var(--hairline)]"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading || disabled}
            className={`
                relative flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-poppins 
                font-medium text-sm transition-all duration-200 shadow-sm active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                cursor-pointer
                ${buttonVariant[varient]}
                ${className}
            `}
        >
            {/* 1. Subtle Spinner */}
            {isLoading && (
                <svg
                    className="animate-spin h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-100"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            )}

            {/* 2. Button Label */}
            <span className="tracking-tight">
                {isLoading ? loadingLabel : label}
            </span>
        </button>
    );
}