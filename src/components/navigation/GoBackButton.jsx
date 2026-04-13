import React from 'react';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../store/slices/authSlice';
import { PATHS } from '../../routes/paths';

const GoBackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return null;
    }

    const fallbackPath = location.pathname.startsWith(PATHS.CUSTOMER_PORTAL)
        ? PATHS.CUSTOMER_PORTAL
        : PATHS.WELCOME;

    const handleGoBack = () => {
        if ((window.history.state?.idx ?? 0) > 0) {
            navigate(-1);
            return;
        }

        navigate(fallbackPath, { replace: true });
    };

    return (
        <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-amber-300 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Go back"
        >
            <Icon icon="mdi:arrow-left" className="h-4 w-4" />
            <span>Go back</span>
        </button>
    );
};

export default GoBackButton;
