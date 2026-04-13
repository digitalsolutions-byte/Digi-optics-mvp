import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import mainBg from '../../assets/main-bg.svg';
import GoBackButton from '../navigation/GoBackButton';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768); 
    const navigate = useNavigate();
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Auto-close sidebar on mobile when navigating
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative flex min-h-screen overflow-hidden bg-slate-50">
            {/* Background Image Layer */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.14]"
                style={{
                    backgroundImage: `url(${mainBg})`,
                    backgroundSize: '1400px',
                    backgroundPosition: 'top right',
                    filter: 'grayscale(100%)'
                }}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-64 bg-gradient-to-b from-orange-100/50 via-white/40 to-transparent" />

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <div
                className={`relative z-10 flex h-screen flex-1 flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'}`}
            >
                <div className="px-3 pt-3 md:px-6 md:pt-5">
                    <Topbar />
                </div>
                <main className="relative flex-1 overflow-x-hidden overflow-y-auto px-3 pb-20 pt-3 md:px-6 md:pb-8 md:pt-4">
                    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4">
                        <div className="rounded-[1.5rem] border border-white/70 bg-white/75 px-4 py-3 shadow-[0_12px_35px_rgba(15,23,42,0.08)] backdrop-blur-md md:px-5">
                            <GoBackButton />
                        </div>
                        <div className="rounded-[1.75rem] border border-slate-200/70 bg-white/88 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-md md:p-6">
                            <Outlet />
                        </div>
                    </div>

                    {/* Floating Action Button (New Order) */}
                    <button
                        onClick={() => navigate('/new-order')}
                        className="fixed bottom-5 right-5 z-50 flex items-center justify-center rounded-full bg-erp-accent p-3 text-white shadow-lg shadow-erp-accent/30 transition-all duration-300 hover:scale-110 hover:bg-erp-accent/85 focus:outline-none focus:ring-4 focus:ring-amber-300 md:bottom-8 md:right-8 md:p-4"
                        title="Create New Order"
                    >
                        <Icon icon="mdi:plus" className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
