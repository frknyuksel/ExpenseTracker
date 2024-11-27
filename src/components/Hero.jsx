import React from "react";
import Image from "next/image";
import { ContainerScroll } from "./container-scrool";

function Hero() {
    return (
        <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
            {/* Animasyonlu Arka Plan */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-blue-900 to-gray-900 animate-gradientBackground"></div>

            {/* İçerik ve Başlık */}
            <div className="relative flex flex-col items-center justify-center z-10 px-6 md:px-12 text-center">
                <ContainerScroll
                    titleComponent={
                        <>
                            <h1 className="text-4xl font-semibold text-white dark:text-white">
                                Manage your Money with AI-Driven Personal <br />
                                <span className="text-4xl md:text-[6rem] text-blue-300 dark:text-blue-400 font-bold mt-1 leading-none">
                                    2N Tech Finance Advisor
                                </span>
                            </h1>
                        </>
                    }
                >
                    {/* Görsel */}
                    <Image
                        src={`/dashboard.png`}
                        alt="hero"
                        height={720}
                        width={1400}
                        className="mx-auto rounded-2xl object-cover h-full object-left-top"
                        draggable={false}
                    />
                </ContainerScroll>
            </div>
        </section>
    );
}

export default Hero;
