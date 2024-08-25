import React, { useEffect, useState } from 'react';

const Toaster = ({ message, type = "success", duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose(); 
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    const iconType = {
        success: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    return (
        <div
            role="alert"
            className={`fixed top-4 right-4 flex items-center p-4 border rounded-lg shadow-lg bg-white z-50 ${type === 'success' ? 'border-green-500 text-green-700' : ''}`}
        >
            {iconType[type]}
            <span className="ml-2">{message}</span>
        </div>
    );
};

export default Toaster;
