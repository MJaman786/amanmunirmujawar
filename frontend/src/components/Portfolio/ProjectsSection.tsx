import Peer2Peer from '../../../public/project-images/peer2peer.png'
import XactMarketing from '../../../public/project-images/XactMarketing.png'
import TaskManagement from '../../../public/project-images/TaskManagement.png'
import AutomateCLI from '../../../public/project-images/AutomateCli.png'
import InteriorDesign from '../../../public/project-images/InterriorDesign.png'
import SambarkStore from '../../../public/project-images/SambarkStore.png'

// ── Types ─────────────────────────────────────────────────────────────────────
export interface CodeSnippet {
  code: string;
  comment: string;
}

export interface ProjectItem {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  projectUrl: string;
  codeSnippet?: CodeSnippet;
}

// ── Reusable ProjectCard Sub-Component ───────────────────────────────────────
export function ProjectCard({
  category,
  title,
  description,
  imageUrl,
  tags,
  projectUrl,
  codeSnippet,
}: ProjectItem) {
  return (
    <div className="feature-card bg-[var(--canvas-elevated)] border border-[var(--hairline)] rounded-xl p-6 flex flex-col gap-4 group">
      {/* Project Image */}
      <div className="card-image-wrapper w-full h-44 rounded-lg overflow-hidden border border-[var(--hairline)] bg-[var(--canvas)]">
        <img
          src={imageUrl}
          alt={title}
          className="card-image w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Card Header & Titles */}
      <div className="card-header-titles flex flex-col gap-1">
        <p className="mono-eyebrow font-mono text-xs font-medium uppercase text-[var(--mute)]">
          {category}
        </p>
        <h3 className="heading-md text-lg font-semibold text-[var(--ink)]">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="body-md text-sm text-[var(--body)] leading-normal">
        {description}
      </p>

      {/* Optional Code Snippet Block */}
      {/* {codeSnippet && (
        <div className="code-block bg-[var(--code-bg)] border border-[var(--hairline)] rounded-lg p-3 font-mono text-xs text-[var(--ink)] overflow-x-auto">
          <code>
            <span className="code-keyword text-[#eb367f]">{codeSnippet.code}</span>
            <br />
            <span className="code-comment text-[var(--mute)]">
              {codeSnippet.comment}
            </span>
          </code>
        </div>
      )} */}

      {/* Card Footer: Tag Pills & Action CTA */}
      <div className="card-footer flex justify-between items-center gap-2 mt-auto pt-2 flex-wrap">
        <div className="card-tags flex gap-1.5 flex-wrap">
          {tags.map((tag) => (
            <span key={tag} className="btn-category-pill">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={projectUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost-sm btn-square-ghost text-xs cursor-pointer flex items-center gap-1"
        >
          <span>View Project</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  );
}

// ── Projects Data Array ──────────────────────────────────────────────────────
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "peer-link",
    category: "REAL-TIME P2P PLATFORM",
    title: "Peer Link — Anonymous Chat & Sharing",
    description:
      "Engineered a real-time P2P platform using WebRTC with zero server-side storage; containerised with Docker and deployed via automated CI/CD pipelines. Implemented SHA-256 file verification.",
    imageUrl: Peer2Peer,
    tags: ["React", "Tailwind CSS", "Node.js", "Express", "Socket.io", "WebRTC"],
    projectUrl: "https://peer2peer-application.vercel.app/",
    codeSnippet: {
      code: "const rtcPeer = new RTCPeerConnection();",
      comment: "// Zero server-side file storage",
    },
  },
  {
    id: "marketing-platform",
    category: "E-COMMERCE SYSTEM",
    title: "XACT MARKETING",
    description: `
      Xact Marketing is a custom full-stack e-commerce store built to handle end-to-end retail workflows. The platform features an intuitive, responsive customer storefront with dynamic product navigation, interactive shopping cart management, and a robust admin interface for backend product and order administration.
    `,
    imageUrl: XactMarketing,
    tags: ["React", "Tailwind CSS", "Node.js", "Express.js", "RESTful APIs", "JWT Authentication", "MongoDB"],
    projectUrl: "https://xactmarketing.in/",
    codeSnippet: {
      code: "const token = jwt.sign({ tenantId }, secret);",
      comment: "// 100% tenant isolation guarantee",
    },
  },
  {
    id: "task-management-platform",
    category: "TASK MANAGEMENT PLATFORM",
    title: "Task Management Application",
    description: `
      A robust task management application designed to streamline project workflows, manage task lifecycles, and optimize productivity.
    `,
    imageUrl: TaskManagement,
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "RESTful APIs", "Swagger", "MongoDB"],
    projectUrl: "https://github.com",
    codeSnippet: {
      code: "const token = jwt.sign({ tenantId }, secret);",
      comment: "// 100% tenant isolation guarantee",
    },
  },
  {
    id: "auto-script",
    category: "AUTOMATE SCRIPT",
    title: "AUTOMATE THE TASK",
    description: `
      A developer productivity tool built in Bash that automates the initial setup and configuration of full-stack web applications. By replacing manual directory creation, package installation, and boilerplate wiring with a single command
    `,
    imageUrl: AutomateCLI,
    tags: ["Bash (Shell Scripting)", "Linux/Unix CLI Utilities (mkdir, curl, sed, grep)", "Vim"],
    projectUrl: "https://github.com/MJaman786/ShellMate",
    codeSnippet: {
      code: "const token = jwt.sign({ tenantId }, secret);",
      comment: "// 100% tenant isolation guarantee",
    },
  },
  {
    id: "design-platform",
    category: "DESIGNER PLATFORM",
    title: "INTERIOR DESIGN",
    description: `
      A modern, responsive interior design website built with React, Vite, Tailwind CSS, and Framer Motion. This professional-grade application showcases interior design services with stunning animations, dark/light mode, and a comprehensive project portfolio
    `,
    imageUrl: InteriorDesign,
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Intersection Observer", "Theme Context"],
    projectUrl: "https://voguevista-interior-design-studio.netlify.app/",
    codeSnippet: {
      code: "const token = jwt.sign({ tenantId }, secret);",
      comment: "// 100% tenant isolation guarantee",
    },
  },
  {
    id: "ecommerce-platform",
    category: "E-COMMERCE PLATFORM",
    title: "Sembark Ecommerce Store",
    description: `
      A modern and responsive Ecommerce Web Application built with React + Vite, TailwindCSS, and React Router. This project demonstrates clean UI components, reusable architecture, and scalable project structure.
    `,
    imageUrl: SambarkStore,
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Intersection Observer", "Theme Context"],
    projectUrl: "https://ecommerce-store-project-one.vercel.app/",
    codeSnippet: {
      code: "const token = jwt.sign({ tenantId }, secret);",
      comment: "// 100% tenant isolation guarantee",
    },
  },
  // {
  //   id: "freelancer-tracker",
  //   category: "MULTI-TENANT SAAS",
  //   title: "Freelancer Invoice & Tracker",
  //   description:
  //     "Architected a multi-tenant SaaS with JWT/RBAC authentication; containerised with Docker and deployed via GitHub Actions CI/CD, ensuring 100% tenant isolation.",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  //   tags: ["Node.js", "MongoDB", "Docker"],
  //   projectUrl: "https://github.com",
  //   codeSnippet: {
  //     code: "const token = jwt.sign({ tenantId }, secret);",
  //     comment: "// 100% tenant isolation guarantee",
  //   },
  // },
];

// ── Main Section Component ───────────────────────────────────────────────────
export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section-container max-w-[1100px] mx-auto py-12 lg:py-16 px-4 lg:px-8 border-t border-[var(--hairline)]"
    >
      {/* Section Header */}
      <div className="section-header mb-8 flex flex-col gap-1">
        <p className="mono-eyebrow font-mono text-xs font-medium uppercase tracking-wider text-[var(--mute)]">
          02 / FEATURED PROJECTS
        </p>
        <h2 className="heading-lg text-2xl lg:text-3xl font-semibold text-[var(--ink)] tracking-tight">
          Production-grade applications.
        </h2>
      </div>

      {/* Grid Iteration */}
      <div className="feature-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS_DATA.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}