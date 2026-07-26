import React from "react";
import type { UserRole } from "../types/Auth";

// Import your Portfolio Pages / Components
import Portfolio from "../pages/Portfolio";
// import Projects from "../pages/Projects";
// import Skills from "../pages/Skills";
// import Experience from "../pages/Experience";
// import Contact from "../pages/Contact";

export interface AppRoute {
    path: string;
    element: React.ReactNode;
    isPrivate: boolean;
    roles?: UserRole[];
    activePage?: string;
}

export const AppRoutes: AppRoute[] = [
    // ── Public Portfolio Showcase Routes ──────────────────────────────────────
    { 
        path: '/', 
        element: <Portfolio />, 
        isPrivate: false, 
        activePage: 'Portfolio' 
    },
    // { 
    //     path: '/projects', 
    //     element: <Projects />, 
    //     isPrivate: false, 
    //     activePage: 'Projects' 
    // },
    // { 
    //     path: '/skills', 
    //     element: <Skills />, 
    //     isPrivate: false, 
    //     activePage: 'Skills' 
    // },
    // { 
    //     path: '/experience', 
    //     element: <Experience />, 
    //     isPrivate: false, 
    //     activePage: 'Experience' 
    // },
    // { 
    //     path: '/contact', 
    //     element: <Contact />, 
    //     isPrivate: false, 
    //     activePage: 'Contact' 
    // }
];