import React from 'react';
import HeaderButton from "@/components/HeaderButton";

const Header = () => {

    return (
        <header className="bg-charcoal">
            <nav className="mx-auto max-w-screen-2xl flex justify-end py-10 px-4">
                <HeaderButton />
            </nav>
        </header>
    );
};

export default Header;
