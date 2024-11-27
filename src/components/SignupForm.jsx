// src/components/SignupForm.jsx

import React, { useState, useEffect } from "react"; // useState ve useEffect burada tek seferde import ediliyor
import { useRouter } from "next/router";  // useRouter sadece bir kez import edilmeli
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils"; // ClassName birleştirme fonksiyonu
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";  // Doğru import işlemi

export function SignupForm() {
    const [error, setError] = useState("");  // useState burada doğru şekilde kullanılıyor
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            firstName: e.target.firstname.value,
            lastName: e.target.lastname.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Kayıt işlemi başarısız");
            }

            const result = await response.json();
            // Kayıt işlemi başarılıysa, kullanıcıyı doğru sayfaya yönlendir
            router.push("/auth/login");  // Doğru sayfa yönlendirmesi
        } catch (error) {
            setError("Bir şeyler ters gitti, lütfen tekrar deneyin.");
        }
    };


    return (
        <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
            {/* Animasyonlu Arka Plan */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-blue-900 to-gray-900 animate-gradientBackground"></div>

            <div className="max-w-lg w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-10">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Hesap Oluşturun
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Hesabınızı oluşturun ve tüm özelliklere erişin.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    {/* İsim ve Soyisim */}
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <LabelInputContainer>
                            <Label htmlFor="firstname">Ad</Label>
                            <Input
                                id="firstname"
                                placeholder="Adınız"
                                type="text"
                                className="w-full"
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="lastname">Soyad</Label>
                            <Input
                                id="lastname"
                                placeholder="Soyadınız"
                                type="text"
                                className="w-full"
                            />
                        </LabelInputContainer>
                    </div>

                    {/* E-posta */}
                    <LabelInputContainer>
                        <Label htmlFor="email">E-posta</Label>
                        <Input
                            id="email"
                            placeholder="example@email.com"
                            type="email"
                            className="w-full"
                        />
                    </LabelInputContainer>

                    {/* Şifre */}
                    <LabelInputContainer>
                        <Label htmlFor="password">Şifre</Label>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            className="w-full"
                        />
                    </LabelInputContainer>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
                    >
                        Kayıt Ol
                    </button>
                </form>

                {/* Harici Giriş Butonları */}
                <div className="space-y-4">
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
        </section>
    );
}

const LabelInputContainer = ({ children }) => {
    return <div className="flex flex-col space-y-2">{children}</div>;
};
