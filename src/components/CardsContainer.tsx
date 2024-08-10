import React from 'react';
import Card from "@/components/card/Card";

const CardsContainer = () => {
    return (
        <div className="grid grid-cols-3 gap-10">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    );
};

export default CardsContainer;