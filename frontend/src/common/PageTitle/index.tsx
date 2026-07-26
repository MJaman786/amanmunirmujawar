import React from "react";
import { X } from "lucide-react";

interface HeaderProps {
  title: string;
  description?: string;
  className?: string;
  handleBack?: () => void;
}

export default function PageTitle({ title, description, className = "", handleBack }: HeaderProps) {
  return (
    <div className={`font-sans ml-2 my-3 flex items-center justify-between ${className}`}>
      <div>
        {/* 1. Main Title - Dynamically uses primary ink color */}
        <h1 className="text-2xl font-extrabold text-[var(--ink)] tracking-tight">
          {title}
        </h1>

        {/* 2. Sub-description - Muted subtitle typography */}
        {description && (
          <p className="text-sm font-medium text-[var(--mute)] mt-1">
            {description}
          </p>
        )}
      </div>

      {handleBack && (
        <button
          onClick={handleBack}
          className="p-2 mr-10 text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--hairline-soft)] border border-[var(--hairline)] rounded-xl transition-all duration-200 flex items-center justify-center group cursor-pointer"
          aria-label="Close"
        >
          <X
            size={20}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-active:scale-90"
          />
        </button>
      )}
    </div>
  );
}