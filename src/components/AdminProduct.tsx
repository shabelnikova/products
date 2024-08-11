import React from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Product } from "@/types/product";
import { format } from "date-fns";

const AdminProduct: React.FC<{ product: Product; onDelete: (id: string) => void; onEdit: (product: Product) => void }> = ({ product, onDelete, onEdit }) => {
    const { image, id, name, price, description, releaseDate } = product;

    return (
        <div className="flex gap-4 p-4 border border-gray-300 rounded justify-between">
            <img className="w-28" src={image} alt={name} />
            <p>Id: {id}</p>
            <p>Name: {name}</p>
            <p>Price: {price}</p>
            <p>Release date: {format(new Date(releaseDate), 'MM/dd/yyyy')}</p>
            <FaEdit className="text-xl cursor-pointer" onClick={() => onEdit(product)} />
            <FaRegTrashCan className="text-xl cursor-pointer" onClick={() => onDelete(id)} />
        </div>
    );
};

export default AdminProduct;
