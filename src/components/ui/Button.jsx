import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
    const baseStyles = "py-2 px-6 font-medium rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-erp-accent focus:ring-offset-2";

    const variants = {
        primary: "bg-erp-accent hover:bg-erp-accent/80 text-white shadow-lg shadow-erp-accent/30",
        outlined: "border-2 border-erp-accent text-erp-accent hover:bg-amber-50",
        ghost: "text-erp-accent hover:bg-amber-50"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
