import React from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Product } from "@/types/product";
import { format } from "date-fns";

const AdminProduct: React.FC<{ product: Product; onDelete: (id: string) => void; onEdit: (product: Product) => void }> = ({ product, onDelete, onEdit }) => {
    const { image, id, name, price, description, releaseDate } = product;

    return (
        <div className="flex gap-4 p-4 border border-gray-300 rounded justify-between">
            <div className="flex gap-4 items-center xl:items-start">
                <img className="w-16 h-auto md:w-28 shrink-0" src={image} alt={name} />
                <div className="flex flex-col xl:flex-row gap-2 md:gap-4 xl:gap-10">
                    <p className="text-sm md:text-base">Id: {id}</p>
                    <p className="text-sm md:text-base">Name: {name}</p>
                    <p className="text-sm md:text-base">Price: {price}</p>
                    <p className="text-sm md:text-base">Release date: {releaseDate ? format(new Date(releaseDate), 'MM/dd/yyyy') : 'Not available'}</p>
                </div>
            </div>
            <div className="flex gap-4">
                <FaEdit className="text-lg md:text-xl cursor-pointer" onClick={() => onEdit(product)} />
                <FaRegTrashCan className="text-lg md:text-xl cursor-pointer" onClick={() => onDelete(id)} />
            </div>
        </div>
    );
};

export default AdminProduct;
