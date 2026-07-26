import React, { useState } from "react";
import Navbar from "../Navbar";
import { X, Code, Briefcase, Mail, FolderGit2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  activePage: string;
}

export default function LayoutWrapper({ children, activePage }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Smooth Section Scroll Handler for Mobile Drawer & Desktop
  const handleScrollToSection = (id: string) => {
    setIsSidebarOpen(false); // Close mobile drawer
    
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/#${id}`;
      }
    }, 100);
  };

  return (
    <div className="font-poppins h-screen w-full bg-[var(--canvas)] text-[var(--ink)] flex overflow-hidden antialiased selection:bg-[var(--link)]/20 selection:text-[var(--link)] transition-colors duration-200">
      
      {/* ── Mobile Overlay Backdrop ── */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── Mobile Left Slide-Over Sidebar Drawer ── */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-[var(--canvas-elevated)] border-r border-[var(--hairline)] z-50 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[var(--hairline)]">
            <a href="#" className="flex items-center gap-2">
              {/* <svg className="fill-[var(--ink)]" width="20" height="20" viewBox="0 0 76 65">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg> */}
              <span className="text-base text-[var(--ink)] tracking-tight">Aman Mujawar</span>
            </a>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--hairline-soft)] border border-[var(--hairline)] rounded-lg transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <nav className="flex flex-col gap-2 mt-6">
            <button
              onClick={() => handleScrollToSection("skills")}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--body)] hover:text-[var(--ink)] hover:bg-[var(--hairline-soft)] transition-colors text-left cursor-pointer"
            >
              <Code size={16} className="text-[var(--mute)]" />
              <span>Skills</span>
            </button>

            <button
              onClick={() => handleScrollToSection("projects")}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--body)] hover:text-[var(--ink)] hover:bg-[var(--hairline-soft)] transition-colors text-left cursor-pointer"
            >
              <FolderGit2 size={16} className="text-[var(--mute)]" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => handleScrollToSection("experience")}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--body)] hover:text-[var(--ink)] hover:bg-[var(--hairline-soft)] transition-colors text-left cursor-pointer"
            >
              <Briefcase size={16} className="text-[var(--mute)]" />
              <span>Experience</span>
            </button>

            <button
              onClick={() => handleScrollToSection("contact")}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--body)] hover:text-[var(--ink)] hover:bg-[var(--hairline-soft)] transition-colors text-left cursor-pointer"
            >
              <Mail size={16} className="text-[var(--mute)]" />
              <span>Contact</span>
            </button>
          </nav>
        </div>

        {/* Drawer Footer Actions */}
        <div className="pt-6 border-t border-[var(--hairline)] flex flex-col gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-full btn-square-primary text-center justify-center"
          >
            GitHub Profile
          </a>
          <p className="text-[11px] text-[var(--mute)] text-center">
            © 2026 Aman Mujawar
          </p>
        </div>
      </aside>

      {/* ── Main Scroll Container ── */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar flex flex-col relative w-full">
        <Navbar
          title={activePage}
          onMenuToggle={() => setIsSidebarOpen(true)}
          onNavClick={handleScrollToSection}
        />
        <div className="lg:px-8 w-full mx-auto flex flex-col gap-6 lg:gap-6">
          {children}
        </div>
      </main>
    </div>
  );
}