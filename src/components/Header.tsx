import React from 'react';
import HeaderButton from "@/components/HeaderButton";
import Link from "next/link";

const Header = () => {

    return (
        <header className="bg-charcoal">

            <nav className="mx-auto max-w-screen-2xl flex justify-between items-center py-10 px-4">
                <Link href="/">
                    <img className="w-16 h-16 rounded-full" src="/images/phoneStoreLogo.png" alt="Logo"/>
                </Link>
                <HeaderButton />
            </nav>
        </header>
    );
};

export default Header;
