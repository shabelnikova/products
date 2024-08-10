import React from 'react';
import styles from './Header.module.css'

const Header = () => {
    return (
        <header className="bg-charcoal">
            <nav className="mx-auto max-w-screen-2xl flex justify-end py-10 px-4">
                <div className="
                py-2.5 px-5 text-base text-charcoal rounded-lg cursor-pointer bg-white
                hover:bg-light-gray-cold
                ">
                    Go to admin panel
                </div>
            </nav>
        </header>
    );
};

export default Header;
