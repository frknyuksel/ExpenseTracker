import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Kullanıcı bilgisini state'e ata
        }
        setLoading(false); // Yükleme tamamlandığında loading false
    }, []);

    const handleLoginClick = () => {
        router.push("/auth/login");
    };

    const handleLogoutClick = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/");
    };


    if (loading) return null;

    return (
        <header className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-black dark:via-gray-800 dark:to-black text-gray-800 dark:text-gray-200 shadow-md">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">

                <a className="flex title-font font-medium items-center text-gray-900 dark:text-gray-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-10 h-10 text-white p-2 bg-blue-600 rounded-full"
                        viewBox="0 0 24 24"
                    >
                        <path d="M4 12l4-4 4 4 4-4 4 4" />
                    </svg>
                    <span className="ml-3 text-3xl font-bold text-blue-600 dark:text-blue-400">
                        FinTrack
                    </span>
                </a>

                <div className="ml-auto flex items-center">
                    <DarkModeToggle />
                    {!user ? (
                        <button
                            onClick={handleLoginClick}
                            className="ml-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={handleLogoutClick}
                            className="ml-5 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
