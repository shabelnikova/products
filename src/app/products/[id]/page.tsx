"use client";
import { useEffect, useState } from 'react';
import {format} from "date-fns";
import {Product} from "@/types/product";

const ProductPage = ({ params }: { params: { id: string } }) => {
    const [product, setProduct] = useState<Product>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${params.id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    if (loading) {
        return <div className="p-24 text-xl">Loading...</div>;
    }

    if (error) {
        return <div className="p-24 text-xl">{error}</div>;
    }

    if (!product) {
        return <div className="p-24 text-xl">Product not found</div>;
    }

    return (
        <main className="mx-auto max-w-screen-2xl">
            <h1 className="text-2xl md:text-4xl font-bold p-10">{product.name}</h1>
            <div className="p-8 md:p-16 flex flex-col md:flex-row items-start gap-8 md:gap-16 ">
                <img src={product.image} alt={product.name} className="w-68 object-contain md:w-80" />
                <div className="flex flex-col gap-8 md:gap-16">
                    <p className="text-lg">{product.description}</p>
                    <p className="text-xl">Price: {product.price}</p>
                    <p className="text-md">Release Date: {format(product.releaseDate, 'MM/dd/yyyy')}</p>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
