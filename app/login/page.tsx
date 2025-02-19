"use client";

import LoginForm from "@/components/loginForm";
import { useState } from "react";


export default function LoginPage() {

    return (
        <section className="flex flex-row h-screen">

            <div
                style={{
                    backgroundImage: 'url("/writer.jpeg")',
                    backgroundSize: "cover",
                    backgroundPosition: "left",
                    backgroundRepeat: "no-repeat",
                    width: "50%",
                }}
                className="onboarding_image hidden md:flex"
            ></div>

            <LoginForm />
        </section>
    );
}