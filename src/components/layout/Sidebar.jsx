import { PATHS } from '../../routes/paths';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { logOut } from '../../store/slices/authSlice';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { hasAccess } from '../../routes/permissions';
import { resetRegistration } from '../../store/slices/customerRegistrationSlice';
import logo from '../../assets/logo.png';

const navItems = [
    { label: 'Dashboard', icon: 'lucide:layout-dashboard', path: PATHS.ROOT },
    {
        label: 'Registration',
        icon: 'lucide:square-pen',
        subItems: [
            { label: 'Register Customer', path: PATHS.CUSTOMER.REGISTER },
            { label: 'Register Staff', path: PATHS.STAFF.REGISTER }
        ]
    },
    {
        label: 'Staff',
        icon: 'lucide:users',
        subItems: [
            { label: 'Staff List', path: PATHS.STAFF.LIST }
        ]
    },
    {
        label: 'Customer',
        icon: 'lucide:user-round',
        subItems: [
            { label: 'Customer List', path: PATHS.CUSTOMER.LIST },
            { label: 'Ship To', path: PATHS.CUSTOMER.SHIP_TO },
            { label: 'Pending Approvals', path: PATHS.APPROVALS },
            { label: 'Correction Needed', path: PATHS.CORRECTIONS }
        ]
    },
    {
        label: 'Customer Care',
        icon: 'lucide:headphones',
        subItems: [
            { label: 'New Order', path: PATHS.CUSTOMER_CARE.NEW_ORDER, isBold: true },
            { label: 'All Orders', path: PATHS.CUSTOMER_CARE.ALL_ORDERS },
            { label: 'Pending Orders', path: PATHS.CUSTOMER_CARE.PENDING_ORDERS },
            { label: 'Order Status', path: PATHS.CUSTOMER_CARE.ORDER_STATUS },
            { label: 'Service/Goods Order', path: PATHS.CUSTOMER_CARE.SERVICE_GOODS },
            { label: 'View Orders', path: PATHS.CUSTOMER_CARE.VIEW_ORDERS },
            { label: 'Upgrade Orders', path: PATHS.CUSTOMER_CARE.UPGRADE_ORDERS },
            { label: 'Update Customers', path: PATHS.CUSTOMER_CARE.UPDATE_CUSTOMERS },
        ]
    },
    { label: 'Drafts', icon: 'lucide:file-text', path: PATHS.DRAFTS },
    { label: 'Stores', icon: 'lucide:store', path: PATHS.STORES },
    { label: 'Reports', icon: 'lucide:chart-column', path: PATHS.OPERATIONS.REPORTS },
    { label: 'Process 1', icon: 'lucide:droplets', path: PATHS.OPERATIONS.TINT },
    { label: 'Process 2', icon: 'lucide:shield', path: PATHS.OPERATIONS.HARD_COAT },
    { label: 'Process 3', icon: 'lucide:layers-3', path: PATHS.OPERATIONS.ARC },
    { label: 'QC', icon: 'lucide:badge-check', path: PATHS.OPERATIONS.QC },
    { label: 'Fitting', icon: 'lucide:ruler', path: PATHS.OPERATIONS.FITTING },
    { label: 'Dispatch', icon: 'lucide:truck', path: PATHS.OPERATIONS.DISPATCH },
    // { label: 'DMS', icon: 'lucide:files', path: PATHS.OPERATIONS.DMS },
    { label: 'Inventory', icon: 'lucide:package-search', path: PATHS.INVENTORY },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(selectCurrentUser);
    const [openSubmenus, setOpenSubmenus] = useState({});

    // Filtered nav items based on permissions
    const filteredNavItems = useMemo(() => {
        return navItems
            .map(item => {
                if (item.subItems) {
                    const filteredSubItems = item.subItems.filter(sub => hasAccess(sub.path, user));
                    if (filteredSubItems.length === 0) return null;
                    return { ...item, subItems: filteredSubItems };
                }
                return hasAccess(item.path, user) ? item : null;
            })
            .filter(Boolean);
    }, [user]);

    // Auto-open submenus on route change
    useEffect(() => {
        const newOpenSubmenus = {};
        filteredNavItems.forEach(item => {
            if (item.subItems?.some(sub => sub.path === location.pathname)) {
                newOpenSubmenus[item.label] = true;
            }
        });
        setOpenSubmenus(prev => ({ ...prev, ...newOpenSubmenus }));
    }, [location.pathname, filteredNavItems]);

    const toggleSubmenu = (label) => {
        setOpenSubmenus(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            dispatch(resetRegistration());
            dispatch(logOut());
        }
    };

    const isParentActive = (item) => {
        return item.subItems?.some(sub => sub.path === location.pathname);
    };

    return (
        <>
            <aside
                className={`fixed top-0 left-0 h-screen bg-white shadow-2xl z-50 flex flex-col justify-between transition-transform duration-300
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
        `}
            >
                {/* Logo */}
                <div className="py-2 md:py-6 px-2  flex justify-center ">
                    <img src={logo} alt="DigiOptics" className=" px-5 object-contain" />
                </div>

                {/* Menu */}
                <nav className="mt-4 px-3 space-y-1 flex-1 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                    {filteredNavItems.map((item) => (
                        <div key={item.label} className="mb-1">
                            {item.subItems ? (
                                <>
                                    <button
                                        onClick={() => toggleSubmenu(item.label)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-base transition cursor-pointer
                                            ${isParentActive(item)
                                                ? 'bg-erp-accent text-white shadow-lg shadow-erp-accent/20 font-semibold'
                                                : openSubmenus[item.label] ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-100 font-medium'}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon icon={item.icon} className="w-[22px] h-[22px]" />
                                            <span>{item.label}</span>
                                        </div>
                                        <Icon
                                            icon="lucide:chevron-down"
                                            className={`w-6 h-6 transition-transform duration-200 ${openSubmenus[item.label] ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* Submenu */}
                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openSubmenus[item.label] ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                        <div className="bg-gray-50 rounded-2xl border-l-[3px] border-[#ff6300] py-2 mx-1 flex flex-col gap-1 shadow-sm">
                                            {item.subItems.map((subItem) => (
                                                <NavLink
                                                    key={subItem.path}
                                                    to={subItem.path}
                                                    className={({ isActive }) =>
                                                        `flex items-center pl-12 pr-4 py-2.5 text-sm font-medium transition-colors
                                                        ${isActive
                                                            ? 'text-gray-900 bg-gray-200/50 rounded-xl mx-2'
                                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 rounded-xl mx-2'
                                                        }`
                                                    }
                                                >
                                                    {subItem.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between px-4 py-3 rounded-2xl text-base transition
                                        ${isActive
                                            ? 'bg-erp-accent text-white shadow-lg shadow-erp-accent/20 font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100 font-medium'
                                        }`
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon icon={item.icon} className="w-[22px] h-[22px]" />
                                        <span>{item.label}</span>
                                    </div>
                                </NavLink>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="flex items-start justify-between w-full mt-auto px-4 space-y-2">
                    <button onClick={handleLogout} className="flex items-center gap-3 text-erp-accent hover:text-erp-accent/80 w-full">
                        <Icon icon="lucide:log-out" className="w-5 text-black h-5" />
                        LogOut
                    </button>
                    <button className="flex items-center gap-3 text-erp-accent hover:text-erp-accent/80 w-full">
                        <Icon icon="lucide:circle-help" className="w-5 text-black h-5" />
                        Help
                    </button>
                </div>
            </aside>

            {/* Edge Toggle Button (like Figma) */}
            <button
                onClick={toggleSidebar}
                className={`fixed top-20 md:top-1/2 z-50 bg-erp-accent text-white shadow-xl shadow-erp-accent/20 w-8 h-12 rounded-r-2xl flex items-center justify-center -translate-y-1/2 transition-all duration-300 hover:w-10 hover:shadow-erp-accent/40
                    ${isOpen ? 'left-64' : 'left-0'}
                `}
                aria-label="Toggle Sidebar"
            >
                <Icon icon={isOpen ? 'lucide:panel-left-close' : 'lucide:panel-left-open'} className="w-5 h-5" />
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default Sidebar;
