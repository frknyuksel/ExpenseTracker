// src/pages/signup.js
import React from 'react';
import { SignupForm } from '../../components/SignupForm'
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SignupPage() {
    return (
        <>
            <Header />
            <SignupForm /> {/* Signup form bileşenini çağırdık */}
            <Footer />
        </>
    );
}
