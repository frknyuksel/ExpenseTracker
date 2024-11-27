'use client'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SidebarDemo } from '@/components/Sidebar';
import React from 'react';

export default function SidebarPage() {
    return (
        <div className="flex flex-col min-h-screen">

            <header className="flex-shrink-0 shadow z-10">
                <Header />
            </header>


            <div className="flex flex-1 p-6 w-full bg-gray-100">

                <SidebarDemo />
            </div>


            <footer className="flex-shrink-0 mt-auto text-center">
                <Footer />
            </footer>
        </div>
    );
}
