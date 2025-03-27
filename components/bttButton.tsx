"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BttButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > window.innerHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <>
            {isVisible && (
                <div className="fixed transition-all md:block hidden bottom-10 right-10">
                    <Link className="button_btt" href={"#heroSection"}>
                        <svg className="svgIcon" viewBox="0 0 384 512">
                            <path
                                d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                            ></path>
                        </svg>
                    </Link>
                </div>
            )}
        </>
    );
}
