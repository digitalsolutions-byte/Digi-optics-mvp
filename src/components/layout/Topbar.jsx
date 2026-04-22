import React from 'react';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';

const Topbar = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="w-full rounded-[1.4rem] border border-white/60 bg-gradient-to-r from-erp-accent to-[#f7e7ce] text-white shadow-[0_16px_40px_rgba(15,23,42,0.14)]">
            <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-5">
                <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/65">Workspace</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                        <h1 className="truncate text-sm font-semibold md:text-lg">{user?.employeeName || 'Team Member'}</h1>
                        <span className="rounded-full bg-white/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/85">
                            {user?.Department?.name || 'Department'}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-dark/10 text-erp-accent/90 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    aria-label="Notifications"
                >
                    <Icon icon="mdi:bell-outline" className="h-5 w-5" />
                    <span className="absolute right-2.5 top-2.5 block h-2 w-2 rounded-full bg-amber-300 ring-2 ring-erp-dark"></span>
                </button>
            </div>
        </div>
    );
};

export default Topbar;
