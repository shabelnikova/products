import React from 'react';
import {inspect} from "util";
import styles from "./footer.module.css"

const Footer = () => {
    return (
        <footer className="bg-charcoal">
           <div className="text-white py-8 px-4 text-sn flex justify-end mx-auto max-w-screen-2xl">
               Ksenia Shabelnikov&copy; 2024
           </div>
        </footer>
    );
};
export default Footer;
