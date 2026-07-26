import React from "react";
import { ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import Spinner from "../../../common/Spinner";

export type Column<T> = {
    label: string;
    accessor: keyof T;
    render?: (value: any, row: T) => React.ReactNode;
};

interface DataTableProp<T> {
    column: Column<T>[];
    data?: T[];
    page?: number;
    totalPages?: number;
    totalItems?: number;
    limit?: number;
    onPageChange?: (page: number) => void;
    onLimitChange?: (limit: number) => void;
    isFetching?: boolean;
    isFooter?: boolean;
}

const getStatusStyles = (status: string) => {
    switch (status) {
        case "APPROVED":
        case "ACTIVE":
            return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
        case "PENDING":
        case "SUSPENDED":
            return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
        case "REJECTED":
        case "BANNED":
            return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
        default:
            return "bg-[var(--hairline-soft)] text-[var(--mute)]";
    }
};

const LIMIT_OPTIONS = [5, 10, 20, 50];

export default function CustomTable<T>({
    column,
    data,
    page = 1,
    totalPages = 1,
    totalItems = 0,
    limit = 5,
    onPageChange,
    onLimitChange,
    isFetching,
    isFooter = true
}: DataTableProp<T>) {

    const getPageNumbers = (): (number | "...")[] => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | "...")[] = [1];

        if (page > 3) pages.push("...");

        for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
            pages.push(i);
        }

        if (page < totalPages - 2) pages.push("...");
        pages.push(totalPages);

        return pages;
    };

    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, totalItems);

    if (isFetching) {
        return <Spinner />;
    }

    return (
        <div className="font-sans w-full bg-[var(--canvas-elevated)] border border-[var(--hairline)] rounded-2xl overflow-hidden shadow-sm transition-colors duration-200">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    {/* Header */}
                    <thead>
                        <tr className="border-b border-[var(--hairline)] bg-[var(--hairline-soft)]/50">
                            {column.map((c, i) => (
                                <th
                                    key={i}
                                    className={`px-4 py-4 text-[11px] font-bold text-[var(--mute)] uppercase tracking-widest
                                        ${c.label === "Actions" ? "text-right" : ""}
                                    `}
                                >
                                    {c.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-[var(--hairline-soft)]">
                        {data && data.length > 0 ? (
                            data?.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="hover:bg-[var(--hairline-soft)]/60 border-t border-[var(--hairline)] transition-colors duration-150"
                                >
                                    {column.map((col, colIndex) => {
                                        const value = row[col.accessor];
                                        return (
                                            <td
                                                key={colIndex}
                                                className={`px-3 py-3 ${col.label === "Actions" ? "text-right" : ""}`}
                                            >
                                                {col.render ? (
                                                    col.render(value, row)
                                                ) : col.accessor === "status" || col.label === "Status" ? (
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-semibold ${getStatusStyles(String(value))}`}>
                                                        {String(value)}
                                                    </span>
                                                ) : (
                                                    <span className="text-[12px] font-medium text-[var(--ink)]">
                                                        {String(value)}
                                                    </span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={column.length} className="py-20">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="p-4 bg-[var(--hairline-soft)] rounded-full">
                                            <Inbox size={40} className="text-[var(--faint)]" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-base font-semibold text-[var(--ink)]">No Data Found</p>
                                            <p className="text-sm text-[var(--mute)]">There are no records to display at the moment.</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── Pagination Footer ── */}
            {isFooter && (
                <div className="px-6 py-4 border-t border-[var(--hairline)] flex items-center justify-between bg-[var(--canvas-elevated)] flex-wrap gap-3 transition-colors duration-200">

                    {/* Left: count + limit pills */}
                    <div className="flex items-center gap-4">
                        {/* Showing X–Y of Z */}
                        <p className="text-sm text-[var(--mute)] font-medium">
                            Showing{" "}
                            <span className="text-[var(--ink)] font-bold">{startItem}</span>
                            {" "}–{" "}
                            <span className="text-[var(--ink)] font-bold">{endItem}</span>
                            {" "}of{" "}
                            <span className="text-[var(--ink)] font-bold">{totalItems}</span>
                            {" "}users
                        </p>

                        {/* Limit pill buttons */}
                        <div className="flex items-center gap-1 bg-[var(--hairline-soft)] border border-[var(--hairline)] rounded-lg p-1">
                            {LIMIT_OPTIONS.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => {
                                        onLimitChange?.(opt);
                                        onPageChange?.(1);
                                    }}
                                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer
                                        ${limit === opt
                                            ? "bg-[var(--canvas-elevated)] text-[var(--ink)] shadow-sm border border-[var(--hairline)]"
                                            : "text-[var(--mute)] hover:text-[var(--ink)]"
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: prev / page numbers / next */}
                    <div className="flex items-center gap-2">
                        {/* Prev */}
                        <button
                            disabled={page === 1}
                            onClick={() => onPageChange?.(page - 1)}
                            className="p-2 rounded-lg border border-[var(--hairline)] text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--hairline-soft)] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={15} />
                        </button>

                        {/* Page numbers */}
                        <div className="flex items-center gap-1">
                            {getPageNumbers().map((p, i) =>
                                p === "..." ? (
                                    <span key={`ellipsis-${i}`} className="w-8 text-center text-[var(--faint)] text-sm">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={p}
                                        onClick={() => onPageChange?.(p as number)}
                                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer
                                            ${p === page
                                                ? "bg-[var(--primary)] text-[var(--on-primary)] shadow-sm"
                                                : "text-[var(--mute)] hover:bg-[var(--hairline-soft)] hover:text-[var(--ink)]"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                )
                            )}
                        </div>

                        {/* Next */}
                        <button
                            disabled={data?.length === 0 || page === totalPages}
                            onClick={() => onPageChange?.(page + 1)}
                            className="p-2 rounded-lg border border-[var(--hairline)] text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--hairline-soft)] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={15} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}