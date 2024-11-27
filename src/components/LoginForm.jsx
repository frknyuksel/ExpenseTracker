'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Geçersiz giriş bilgileri");
            }

            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data.user)); // Kullanıcı bilgisini localStorage'a kaydet
            router.push("/dashboard"); // Dashboard sayfasına yönlendir
        } catch (err) {
            setError("Geçersiz e-posta veya şifre. Lütfen tekrar deneyin.");
        }
    };

    return (
        <>

            <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
                {/* Animasyonlu Arka Plan */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-blue-900 to-gray-900 animate-gradientBackground"></div>

                <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-12 flex flex-col lg:flex-row transform transition-transform duration-500 ease-in-out hover:scale-105">
                    {/* Sol Alan */}
                    <div className="flex-1 lg:pr-10 mb-8 lg:mb-0 opacity-90 hover:opacity-100 transition-opacity duration-300">
                        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            Bütçenizi Kolayca Takip Edin!
                        </h1>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Gelir ve giderlerinizi takip ederek, bütçenizi daha verimli yönetin.
                            Hedeflerinize ulaşmak için harcamalarınızı kontrol altına alın!
                        </p>
                        <button
                            onClick={toggleDarkMode}
                            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
                        >
                            {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                    </div>

                    {/* Sağ Login Formu */}
                    <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md transform transition-transform duration-500 ease-in-out hover:scale-105">
                        <h2 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-5">
                            Giriş Yap
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* E-Posta */}
                            <div>
                                <Label htmlFor="email" className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                                    E-posta
                                </Label>
                                <Input
                                    id="email"
                                    placeholder="E-posta adresinizi girin"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-200 dark:bg-gray-800 border dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-700"
                                />
                            </div>

                            {/* Şifre */}
                            <div>
                                <Label htmlFor="password" className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                                    Şifre
                                </Label>
                                <Input
                                    id="password"
                                    placeholder="Şifrenizi girin"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-200 dark:bg-gray-800 border dark:border-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-700"
                                />
                            </div>

                            {/* Giriş Butonu */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
                            >
                                Giriş Yap
                            </button>

                            {/* Hata Mesajı */}
                            {error && <p className="text-red-500 mt-4">{error}</p>}

                            {/* Ekstra Metin */}
                            <p className="text-gray-600 dark:text-gray-400 text-sm text-center mt-4">
                                Henüz hesabınız yok mu?{" "}
                                <a
                                    href="/auth/signup"
                                    className="text-blue-500 hover:underline dark:text-blue-400"
                                >
                                    Kayıt Ol
                                </a>
                            </p>
                        </form>

                        {/* Harici Giriş Butonları */}
                        <div className="space-y-4 mt-6">
                            <button
                                type="button"
                                className="flex items-center justify-center w-full px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-md shadow hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                            >
                                <IconBrandGithub className="h-5 w-5 mr-2" />
                                GitHub ile Giriş Yap
                            </button>

                            <button
                                type="button"
                                className="flex items-center justify-center w-full px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-md shadow hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                            >
                                <IconBrandGoogle className="h-5 w-5 mr-2" />
                                Google ile Giriş Yap
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Login;
