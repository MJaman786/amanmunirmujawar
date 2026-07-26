import React from 'react';

interface ToggleBtnTypes {
    value: boolean;
    /** Pass formik.setFieldValue or a custom toggle handler */
    handleToggle: () => void;
    /** Optional name for accessibility or automated testing */
    name?: string;
}

export default function ToggleBtn({ value, handleToggle, name}: ToggleBtnTypes) {
    return (
        <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
                type="checkbox"
                name={name}
                className="sr-only peer"
                checked={value}
                onChange={handleToggle}
            />
            <div
                className="w-11 h-6 bg-[var(--hairline)] rounded-full peer 
                peer-focus:outline-none
                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                after:bg-[var(--canvas-elevated)] after:border-[var(--hairline)] 
                after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                peer-checked:bg-[var(--primary)] transition-colors duration-200"
            />
        </label>
    );
}