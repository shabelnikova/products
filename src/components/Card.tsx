
import React from 'react';
import Link from "next/link";

interface IProps {
    id: string
    image: string;
    name: string;
    description: string;
    price: number;
}
const Card: React.FC<IProps> = ({image, name, description, price, id}) => {
    return (
        <Link href={`/products/${id}`} className="max-w-100 flex md:flex-col gap-4 md:gap-8 justify-between cursor-pointer">
            <img className="w-48 object-contain md:w-full" src={image} alt={name}/>
            <div className="flex flex-col gap-4 md:gap-8">
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="truncate-3-lines">{description}</p>
                <p className="text-xl">Price: {price}</p>
            </div>
        </Link>
    );
};

export default Card;
