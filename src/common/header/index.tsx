import React, { useState } from 'react';
import { Menu, X, Layout, Settings, Home, BarChart2, Layers, User, Bell, ChevronDown } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface navbarProps {
    title: string
}

const Navbar = ({ title }: navbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', icon: <Home size={18} />, href: '/' },
        { name: 'About', icon: <BarChart2 size={18} />, href: '/about' },
        { name: 'Experince', icon: <Layers size={18} />, href: '/experince' },
        { name: 'Projects', icon: <User size={18} />, href: '/projects' },
        { name: 'Contact', icon: <Settings size={18} />, href: '/contact' },
    ];

    return (
        <div className="font-poppins bg-slate-50/50">
            {/* --- TOP NAVBAR --- */}
            <nav className="fixed top-0 w-full z-40 bg-white border-b border-slate-200/60 h-16 flex items-center px-4 md:px-8 justify-between shadow-sm shadow-slate-100/50">
                <div className="w-full flex items-center gap-4">
                    {/* Brand & Hamburger Logic */}
                    <div className={`w-[100%] md:w-[100%] lg:w-[13%] flex items-center gap-3`}>
                        {/* Hamburger - Visible on Mobile/Tablet (up to lg) */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
                        >
                            <Menu size={20} />
                        </button>

                        <div className="flex items-center gap-2.5">
                            {/* <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm shadow-indigo-200">
                                <Layout className="text-white" size={18} />
                            </div> */}
                            <span className="font-medium text-lg tracking-tight text-slate-900">
                                Aman<span className="text-indigo-600"> Mujawar</span>
                            </span>
                        </div>
                    </div>

                    {/* --- DESKTOP NAV LINKS --- 
                        Visible only on Laptop/Desktop (lg and up) */}
                    <div className="hidden w-[90%] lg:flex items-center justify-center gap-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.href}
                                className={`
                                    px-4 py-2 text-sm font-medium hover:text-indigo-600 hover:bg-indigo-50/50
                                    rounded-lg transition-all ${(title === link.name) ? `text-indigo-600 bg-indigo-50/50` : `text-slate-600`}
                                `}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <button className="hidden sm:flex p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                    </button>

                    {/* <div className="h-8 w-px bg-slate-200 mx-1 hidden lg:block"></div> */}

                    {/* <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                        <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
                            <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" alt="avatar" />
                        </div>
                        <div className="hidden md:block">
                            <p className="text-xs font-medium text-slate-900 leading-none">Alex Rivera</p>
                            <p className="text-[10px] text-slate-500 mt-1">Admin Account</p>
                        </div>
                        <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-colors hidden md:block" />
                    </div> */}
                </div>
            </nav>

            {/* --- MOBILE SIDEBAR OVERLAY --- */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* --- MOBILE SIDEBAR (Drawer) --- 
                Hidden on Desktop (lg) */}
            <aside className={`
                fixed top-0 left-0 z-[60] h-full w-72 bg-white shadow-2xl
                transform transition-transform duration-300 ease-in-out lg:hidden
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
            `}>
                <div className="flex items-center justify-between p-6 border-b border-slate-50">
                    <div className="flex items-center gap-2">
                        {/* <div className="bg-indigo-600 p-1.5 rounded-lg">
                            <Layout className="text-white" size={18} />
                        </div> */}
                        <span className="text-lg font-medium text-slate-900">Aman <span className="text-indigo-600"> Mujawar</span></span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="px-4 py-6 space-y-1.5">
                    <p className="px-4 text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-4">Main Menu</p>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.href}
                            className={`
                                flex items-center gap-3 px-4 py-3 text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all group font-medium text-sm
                                ${(title === link.name) ? `text-indigo-600 bg-indigo-50/50` : `text-slate-600`}    
                            `}
                        >
                            <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                                {link.icon}
                            </span>
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                        <p className="text-xs font-medium text-slate-900">Portfolio Mode</p>
                        <p className="text-[11px] text-slate-500 mb-3">Viewing Enterprise UI Layout</p>
                        <button className="w-full py-2 bg-indigo-600 rounded-lg text-xs font-medium text-white hover:bg-indigo-700 transition-all">
                            View Code
                        </button>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            {/* Note: md:pl-0 because the sidebar is gone on desktop now */}
        </div>
    );
};

export default Navbar;