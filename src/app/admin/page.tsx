"use client";
import React, {useState} from 'react';
import initialProducts from "@/data/products";
import AdminProduct from "@/components/AdminProduct";
import {Product} from "@/types/product";

const Page = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts);

    const handleDelete = (id: string) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts); // Обновляем состояние
    };

    return (
        <main className="mx-auto max-w-screen-2xl py-4 w-4/5 flex flex-col gap-4">
            <button className="
            py-10 px-14 text-xl
            font-semibold border bg-gray-300
            rounded-lg hover:bg-gray-400/60
            ">
                Add new product
            </button>
            {products.map((product) => (
                <AdminProduct
                    key={product.id}
                    product={product}
                    onDelete={handleDelete}
                />
            ))}
        </main>
    );
};

export default Page;