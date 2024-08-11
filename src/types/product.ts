export interface Product {
    id: string;
    image: string;
    name: string;
    price: number;
    description: string;
    releaseDate: Date | null;
}