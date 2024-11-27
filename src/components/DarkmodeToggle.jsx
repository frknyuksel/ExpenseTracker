'use client';
import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Sayfa yüklendiğinde, daha önceki tema tercihini kontrol et
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            // Dark mode açılacak
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            // Dark mode kapanacak
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            onClick={handleToggle}
            className="bg-gray-800 text-white p-2 rounded"
        >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};

export default DarkModeToggle;
