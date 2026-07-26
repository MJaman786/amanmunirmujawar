import { Search } from "lucide-react";

interface SearchBarProp {
    search: string;
    setSearch: (value: string) => void;
    placeholder?: string;
}

export function SearchBar({ search, setSearch, placeholder }: SearchBarProp) {
    return (
        <div className="relative group font-sans">
            <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--mute)] group-focus-within:text-[var(--link)] transition-colors"
                size={18}
            />
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder={placeholder ?? "Search activities, users, or properties..."}
                className="w-full bg-[var(--canvas-elevated)] border border-[var(--hairline)] hover:border-[var(--mute)] rounded-xl py-2.5 pl-12 pr-4 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--link)]/15 focus:border-[var(--link)] transition-all duration-150 placeholder:text-[var(--faint)]"
            />
        </div>
    );
}