import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    type KeyboardEvent,
} from "react";
import {
    ChevronDown,
    X,
    Search,
    Check,
    AlertCircle,
    Loader2,
    CheckSquare,
    Square,
} from "lucide-react";
import { useDropdown } from "./useDropdown";

// ── Option shape ──────────────────────────────────────────────────────────────
export interface DropdownOption {
    label: string;
    value: string;
}

// ── Component props ───────────────────────────────────────────────────────────
export interface DropdownProps {
    /** Label displayed above the dropdown */
    label?: string;

    /** Array of selectable options */
    options: DropdownOption[];

    /** Controlled selected value(s). Pass string[] for multiSelect, string for single. */
    value?: string | string[];

    /** Fires with updated value(s) whenever selection changes */
    onChange?: (value: string | string[]) => void;

    /** Placeholder shown when nothing is selected */
    placeholder?: string;

    /** Enable multi-select mode */
    multiSelect?: boolean;

    /**
     * Auto-selects the first option on mount.
     * Ignored when noAutoSelect is true.
     */
    autoSelect?: boolean;

    /** Explicitly prevents auto-selection even if autoSelect is true */
    noAutoSelect?: boolean;

    /** Disables the entire dropdown */
    disabled?: boolean;

    /** Shows a spinner and disables interaction */
    loading?: boolean;

    /** Displays an error message below the trigger */
    error?: string;

    /** Only displays the error if the field has been touched */
    touched?: boolean;

    /** Extra Tailwind classes applied to the trigger element */
    className?: string;

    /** Custom width for the entire dropdown container (e.g., '300px', '50%', 400) */
    width?: string | number;

    /** Custom minimum height for the trigger button (e.g., '48px', 50) */
    height?: string | number;

    /** Custom max height for the options panel (e.g., '300px', '50vh') */
    panelMaxHeight?: string | number;
}

/**
 * Dropdown — a reusable, accessible, single/multi-select component.
 * Supports search, auto-select, loading & error states with dynamic theme integration.
 */
const Dropdown: React.FC<DropdownProps> = ({
    label,
    options = [],
    value,
    onChange,
    placeholder = "Select an option",
    multiSelect = false,
    autoSelect = false,
    noAutoSelect = false,
    disabled = false,
    loading = false,
    error,
    touched,
    className = "",
    width,
    height,
    panelMaxHeight = "40vh",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const showError = touched && error;
    
    const {
        isOpen,
        searchQuery,
        filteredOptions,
        activeIndex,
        selectedValues,
        setIsOpen,
        setSearchQuery,
        setActiveIndex,
        handleSelect,
        handleClearAll,
        handleSelectAll,
        isSelected,
        allSelected,
    } = useDropdown({
        options,
        value,
        onChange,
        multiSelect,
        autoSelect,
        noAutoSelect,
    });

    // ── Close on outside click ──────────────────────────────────────────────────
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
                setSearchQuery("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen, setSearchQuery]);

    // ── Keyboard navigation ─────────────────────────────────────────────────────
    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
            if (disabled || loading) return;

            switch (e.key) {
                case "Enter":
                case " ":
                    if (isOpen && (e.target as HTMLElement).tagName === "INPUT") {
                        return;
                    }
                    if (!isOpen) {
                        setIsOpen(true);
                    } else if (activeIndex >= 0 && filteredOptions[activeIndex]) {
                        handleSelect(filteredOptions[activeIndex]);
                    }
                    e.preventDefault();
                    break;
                case "ArrowDown":
                    if (!isOpen) setIsOpen(true);
                    setActiveIndex((prev) =>
                        Math.min(prev + 1, filteredOptions.length - 1)
                    );
                    e.preventDefault();
                    break;
                case "ArrowUp":
                    setActiveIndex((prev) => Math.max(prev - 1, 0));
                    e.preventDefault();
                    break;
                case "Escape":
                    setIsOpen(false);
                    setSearchQuery("");
                    e.preventDefault();
                    break;
            }
        },
        [
            disabled,
            loading,
            isOpen,
            activeIndex,
            filteredOptions,
            handleSelect,
            setIsOpen,
            setActiveIndex,
            setSearchQuery,
        ]
    );

    // ── Trigger label ───────────────────────────────────────────────────────────
    const renderTriggerContent = () => {
        if (loading) {
            return (
                <span className="font-poppins flex items-center gap-2 text-[var(--mute)]">
                    <Loader2 size={14} className="animate-spin text-[var(--link)]" />
                    <span className="font-medium tracking-wide text-xs uppercase">Loading…</span>
                </span>
            );
        }

        if (selectedValues.length === 0) {
            if (isOpen) return null;
            return (
                <span className="text-[var(--faint)] font-medium tracking-wide">
                    {placeholder}
                </span>
            );
        }

        if (multiSelect) {
            return (
                <div className="flex flex-wrap gap-1.5">
                    {selectedValues.map((val) => {
                        const opt = options.find((o) => o.value === val);
                        return (
                            <span
                                key={val}
                                className="inline-flex items-center gap-1 bg-[var(--link)]/10 border border-[var(--link)]/20 text-[var(--link)] text-[11px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-md"
                            >
                                {opt?.label}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelect(opt!);
                                    }}
                                    className="hover:opacity-75 transition-opacity ml-0.5"
                                >
                                    <X size={10} strokeWidth={2.5} />
                                </button>
                            </span>
                        );
                    })}
                </div>
            );
        }

        // Single select
        if (isOpen) return null;

        const selected = options.find((o) => o.value === selectedValues[0]);
        return (
            <span className="text-[var(--ink)] font-medium tracking-wide truncate">
                {selected?.label}
            </span>
        );
    };

    // ── Dynamic Geist Theme Classes ─────────────────────────────────────────────
    const triggerBase = [
        "relative w-full flex items-center justify-between",
        "px-4 py-2.5 rounded-xl",
        "border font-sans text-sm",
        "transition-all duration-150 cursor-pointer select-none",
        "focus:outline-none",
        disabled || loading
            ? "bg-[var(--hairline-soft)] border-[var(--hairline)] text-[var(--faint)] cursor-not-allowed opacity-70"
            : showError 
                ? "bg-[var(--canvas-elevated)] border-[#ee0000] shadow-[0_0_0_3px_rgba(238,0,0,0.12)]"
                : isOpen
                    ? "bg-[var(--canvas-elevated)] border-[var(--link)] shadow-[0_0_0_3px_rgba(0,112,243,0.15)]"
                    : "bg-[var(--canvas-elevated)] border-[var(--hairline)] hover:border-[var(--mute)] shadow-sm",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            ref={containerRef}
            className="relative font-sans flex flex-col gap-1.5"
            style={{ width: width || "100%" }}
            onKeyDown={handleKeyDown}
            tabIndex={disabled || loading ? -1 : 0}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-disabled={disabled}
        >
            {/* ── Optional Label ── */}
            {label && (
                <label className="text-[11px] font-bold text-[var(--mute)] uppercase tracking-widest ml-1">
                    {label}
                </label>
            )}

            {/* ── Trigger Button ── */}
            <div
                className={triggerBase}
                style={{ minHeight: height || "44px" }}
                onClick={() => {
                    if (!disabled && !loading) setIsOpen((prev) => !prev);
                }}
            >
                <div className="flex-1 min-w-0 pr-2 flex flex-wrap items-center gap-2">
                    {renderTriggerContent()}
                    
                    {/* ── Search Input (Inside Trigger) ── */}
                    {isOpen && (
                        <div 
                            className="flex items-center gap-2 flex-1 min-w-[80px]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Search size={13} className="text-[var(--mute)] shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setActiveIndex(0);
                                }}
                                placeholder="Search…"
                                className="flex-1 bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--faint)] outline-none font-medium w-full"
                                autoFocus
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSearchQuery("");
                                    }}
                                    className="text-[var(--mute)] hover:text-[var(--ink)] shrink-0"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                    {/* Clear all (single or multi) */}
                    {selectedValues.length > 0 && !disabled && !loading && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClearAll();
                            }}
                            className="p-0.5 rounded-md text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--hairline-soft)] transition-colors"
                            aria-label="Clear selection"
                        >
                            <X size={14} strokeWidth={2.5} />
                        </button>
                    )}
                    <ChevronDown
                        size={16}
                        strokeWidth={2.5}
                        className={`text-[var(--mute)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </div>
            </div>

            {/* ── Error message ── */}
            {showError && (
                <p className="mt-1 flex items-center gap-1.5 text-[#ee0000] text-xs font-medium">
                    <AlertCircle size={12} />
                    {error}
                </p>
            )}

            {/* ── Dropdown Panel ── */}
            {isOpen && (
                <div
                    className="font-sans absolute z-50 min-w-full w-max max-w-[95vw] top-[100%] mt-2 bg-[var(--canvas-elevated)] border border-[var(--hairline)] rounded-xl shadow-lg overflow-hidden transition-colors"
                    role="listbox"
                    aria-multiselectable={multiSelect}
                >
                    {/* Select All (multi only) */}
                    {multiSelect && filteredOptions.length > 0 && (
                        <div className="px-2 pt-1.5 pb-1 mt-1">
                            <button
                                type="button"
                                onClick={handleSelectAll}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[var(--link)] uppercase tracking-widest hover:bg-[var(--link)]/10 transition-colors"
                            >
                                {allSelected ? (
                                    <CheckSquare size={13} strokeWidth={2.5} />
                                ) : (
                                    <Square size={13} strokeWidth={2.5} />
                                )}
                                {allSelected ? "Deselect All" : "Select All"}
                            </button>
                        </div>
                    )}

                    {/* Options list */}
                    <ul 
                        className="overflow-y-auto py-1.5 px-2 space-y-0.5 custom-scrollbar"
                        style={{ maxHeight: panelMaxHeight }}
                    >
                        {filteredOptions.length === 0 ? (
                            <li className="py-6 text-center text-sm text-[var(--mute)] font-medium">
                                No results found
                            </li>
                        ) : (
                            filteredOptions.map((option, index) => {
                                const selected = isSelected(option.value);
                                const active = index === activeIndex;

                                return (
                                    <li
                                        key={option.value}
                                        role="option"
                                        aria-selected={selected}
                                        onClick={() => handleSelect(option)}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        className={[
                                            "flex items-center justify-between gap-3",
                                            "px-3 py-2.5 rounded-lg cursor-pointer",
                                            "text-sm font-medium transition-colors duration-100",
                                            selected
                                                ? "bg-[var(--link)]/10 text-[var(--link)] font-semibold"
                                                : active
                                                    ? "bg-[var(--hairline-soft)] text-[var(--ink)]"
                                                    : "text-[var(--body)] hover:bg-[var(--hairline-soft)] hover:text-[var(--ink)]",
                                        ].join(" ")}
                                    >
                                        <span className="truncate tracking-wide">{option.label}</span>
                                        {selected && (
                                            <Check
                                                size={14}
                                                strokeWidth={2.5}
                                                className="text-[var(--link)] shrink-0 ml-4"
                                            />
                                        )}
                                    </li>
                                );
                            })
                        )}
                    </ul>

                    {/* Footer info (multi) */}
                    {multiSelect && selectedValues.length > 0 && (
                        <div className="border-t border-[var(--hairline-soft)] px-4 py-2 flex items-center justify-between">
                            <span className="text-[11px] text-[var(--mute)] font-semibold tracking-wider uppercase">
                                {selectedValues.length} selected
                            </span>
                            <button
                                type="button"
                                onClick={handleClearAll}
                                className="text-[11px] text-[#ee0000] font-semibold tracking-wider uppercase hover:opacity-75 transition-opacity"
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dropdown;