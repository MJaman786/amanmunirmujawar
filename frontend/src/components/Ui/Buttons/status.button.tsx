interface StatusButtonTypes {
    label: string,
    variant: string,
    onClick: (val: string) => void,
    currentStatus: string
}

export default function StatusButton({
    label,
    variant = "",
    onClick,
    currentStatus = ""
}: StatusButtonTypes) {

    const isActive = variant === currentStatus;
    return (
        <button
            onClick={(e) => { onClick?.(variant) }}
            className={`
                font-poppins font-semibold px-4 py-2.5 rounded-full border text-xs transition-all duration-200
                hover:opacity-90 active:scale-95 flex items-center justify-center cursor-pointer
                ${isActive 
                    ? 'bg-[var(--primary)] text-[var(--on-primary)] border-transparent' 
                    : 'bg-[var(--canvas-elevated)] text-[var(--body)] border-[var(--hairline)] hover:bg-[var(--hairline-soft)] hover:text-[var(--ink)]'
                }
            `}
        >
            {label}
        </button>
    );
}