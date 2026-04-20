import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png';
import futuristicBg from '../../assets/futuristic-bg.png';
import { Icon } from '@iconify/react';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col futuristic-gradient overflow-hidden">
            {/* Minimal Futuristic Header */}
            <header className="relative z-20 w-full px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-erp-accent rounded-xl flex items-center justify-center glow-accent">
                        <img src={logo} alt="Logo" className="h-6 brightness-0 invert" />
                    </div>
                    <span className="text-white font-black tracking-tighter text-xl uppercase italic">
                        Digi<span className="text-erp-accent">Optics</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <div className="h-1 w-20 bg-gradient-to-r from-erp-accent to-transparent rounded-full opacity-50" />
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.5em]">Enterprise System v4.0</span>
                </div>
            </header>

            {/* Main Content Split View */}
            <main className="flex-1 flex flex-col md:flex-row relative">
                {/* Left Side: Futuristic Visuals */}
                <div className="hidden md:flex w-1/2 relative items-center justify-center p-12 overflow-hidden">
                    {/* Animated Glow Elements */}
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-erp-accent/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

                    <div className="relative z-10 w-full h-full max-w-2xl">
                        <img
                            src={futuristicBg}
                            alt="Futuristic Optics"
                            className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl skew-x-1 -rotate-2 border border-white/10"
                        />
                        {/* Overlay Card */}
                        <div className="absolute bottom-10 left-10 p-8 glass-panel-dark rounded-3xl max-w-sm border-l-4 border-erp-accent shadow-2xl">
                            <h2 className="text-white text-2xl font-black mb-2 tracking-tight">Precision Optics Manufacturing</h2>
                            <p className="text-white/60 text-sm font-medium leading-relaxed">
                                Experience the future of lens processing with our AI-driven ERP ecosystem. Streamlined, accurate, and lightning fast.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Authentication Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
                    <div className="w-full max-w-md relative">
                        {/* Shadow/Glow under the form */}
                        <div className="absolute inset-0 bg-erp-accent/5 blur-[80px] -z-10 rounded-full" />

                        <div className="glass-panel-dark rounded-[2.5rem] p-10 md:p-12 shadow-[0_22px_70px_8px_rgba(0,0,0,0.56)] border border-white/10 relative overflow-hidden">
                            {/* Decorative Corner */}
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-erp-accent rotate-45 opacity-20" />

                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-20 w-full py-6 px-12 flex justify-between items-center text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] border-t border-white/5 backdrop-blur-md">
                <p>© 2026 DigiOptics Industrial. All Rights Reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-erp-accent transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-erp-accent transition-colors">System Status</a>
                </div>
            </footer>
        </div>
    );
};

export default AuthLayout;
