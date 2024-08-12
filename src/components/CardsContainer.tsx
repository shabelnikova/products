import React from 'react';
import Card from "@/components/Card";
import {Product} from "@/types/product";

const CardsContainer = ({ products }: { products: Product[] }) => {
    if (!products || products.length === 0) {
        return <p className="text-2xl font-bold pl-14">No products available</p>;
    }
    return (
        <>
            <h1 className="text-black text-2xl font-bold pl-8">Our products</h1>
            <div className="text-black py-10 mx-auto grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10
            bg-light-gray-cold">
                {products.map((el) => (
                    <Card
                        key={el.id}
                        id={el.id}
                        image={el.image}
                        name={el.name}
                        description={el.description}
                        price={el.price}
                    />
                ))}
            </div>
        </>
    );
};

export default CardsContainer;
