import React, { useState, useEffect } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { useAuthStore } from "../../store/Auth/useAuthStore";

interface NavbarProps {
  title: string;
  onMenuToggle: () => void;
  onNavClick?: (id: string) => void;
}

const NAV_ITEMS = [
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ title, onMenuToggle, onNavClick }: NavbarProps) {
  const { user } = useAuthStore();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState<string>("");

  // 1. Sync initial theme state from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemDark ? "dark" : "light");
    
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // 2. Automatic Scroll-Spy Observer (Highlights active link on scroll)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -50% 0px",
      threshold: 0.1,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Theme Switcher Handler
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Smooth Scroll Helper
  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    if (onNavClick) {
      onNavClick(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/#${id}`;
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--hairline)] transition-colors duration-200">
      
      {/* ── Mobile Header ── */}
      <div className="lg:hidden flex items-center justify-between p-4 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="p-2 bg-[var(--canvas-elevated)] border border-[var(--hairline)] rounded-lg text-[var(--ink)] hover:bg-[var(--hairline-soft)] active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu size={18} />
          </button>
          <span className="text-base text-[var(--ink)] tracking-tight">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 bg-[var(--canvas-elevated)] border border-[var(--hairline)] rounded-lg text-[var(--ink)] hover:bg-[var(--hairline-soft)] active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-700" />}
          </button>
        </div>
      </div>

      {/* ── Desktop Header ── */}
      <div className="font-sans hidden lg:grid grid-cols-3 items-center px-8 py-4 max-w-[1400px] w-full mx-auto">
        
        {/* Left Column: Brand Logo */}
        <div className="flex items-center justify-start">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("");
            }} 
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <span className="text-lg text-[var(--ink)] tracking-tight">Aman Mujawar</span>
          </a>
        </div>

        {/* Center Column: Prominent, Big Category Pill Navigation Links */}
        <div className="flex items-center justify-center">
          <nav className="flex items-center gap-2 lg:gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`px-5 py-2.5 text-base rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[var(--hairline-soft)] text-[var(--ink)] shadow-xs"
                      : "text-[var(--ink)] opacity-70 hover:opacity-100 hover:bg-[var(--hairline-soft)]/60"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Column: Theme Toggle */}
        <div className="flex items-center justify-end">
          <button
            onClick={toggleTheme}
            className="p-2.5 bg-[var(--canvas-elevated)] border border-[var(--hairline)] rounded-xl hover:bg-[var(--hairline-soft)] text-[var(--mute)] hover:text-[var(--ink)] active:scale-95 transition-all cursor-pointer shadow-xs"
            aria-label="Toggle Light/Dark Theme"
          >
            {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>
        </div>

      </div>
    </header>
  );
}