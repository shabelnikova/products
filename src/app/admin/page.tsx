"use client";
import React, { useEffect, useState } from 'react';
import AdminProduct from "@/components/AdminProduct";
import { Product } from "@/types/product";

const Page = () => {
    const [products, setProducts] = useState<Product[]>([]); // Начальное состояние - пустой массив

    useEffect(() => {
        // Функция для загрузки данных
        const fetchProducts = async () => {
            const response = await fetch('/api/products');
            const data: Product[] = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []); // Пустой массив зависимостей, чтобы запрос выполнялся один раз при монтировании

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success) {
                const updatedProducts = products.filter(product => product.id !== id);
                setProducts(updatedProducts); // Обновляем состояние
            } else {
                console.error('Failed to delete product:', result.error);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
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
