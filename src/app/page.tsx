import { MongoClient } from 'mongodb';
import CardsContainer from "@/components/CardsContainer";
import {Product} from "@/types/product";

const uri: string = process.env.MONGODB_URI!;
const dbName: string = "products";
const collectionName: string = "items";
async function fetchProducts(): Promise<Product[]> {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const products = await collection.find({}).toArray();
    await client.close();

    const currentDate = new Date();

    return products
        .map(product => ({
            id: product._id.toString(),
            image: product.image,
            name: product.name,
            price: product.price,
            description: product.description,
            releaseDate: new Date(product.releaseDate),
        }))
        .filter(product => product.releaseDate <= currentDate);
}


export default async function Home() {
    const products = await fetchProducts();

    return (
        <main className="mx-auto max-w-screen-2xl py-10 px-4 bg-light-gray-cold">
            <CardsContainer products={products} />
        </main>
    );
}