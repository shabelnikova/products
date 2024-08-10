"use client";
import React from 'react';
import {usePathname, useRouter} from 'next/navigation';

const HeaderButton = ({  }) => {
    const pathname = usePathname();
    const router = useRouter();
    const buttonText = pathname === "/admin" || pathname.includes("products")
        ? "Go to main page"
        : "Go to admin panel";

    const handleClick = () => {
        if (pathname === "/admin" || pathname.includes("products")) {
            router.push('/');
        } else {
            router.push('/admin');
        }
    };

    return (
        <div
            onClick={handleClick}
            className="
                py-2.5 px-5 text-base text-charcoal rounded-lg cursor-pointer bg-white
                hover:bg-light-gray-cold
            "
        >
            {buttonText}
        </div>
    );
};

export default HeaderButton;