'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Login from '@/components/LoginForm'
import React from 'react'

export default function login() {
    return (
        <>
            <Header />
            <Login /> {/* Signup form bileşenini çağırdık */}
            <Footer />
        </>
    )
};
