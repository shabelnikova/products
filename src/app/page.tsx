import { MongoClient } from 'mongodb';
import CardsContainer from "@/components/CardsContainer";
import { Product } from "@/types/product";

const uri: string = process.env.MONGODB_URI!;
const dbName: string = "products";
const collectionName: string = "items";

let cachedClient: MongoClient | null = null;

async function connectToDatabase(): Promise<MongoClient> {
    if (cachedClient) {
        return cachedClient;
    }
    const client = new MongoClient(uri);
    cachedClient = await client.connect();
    return cachedClient;
}

async function fetchProducts(): Promise<Product[]> {
    try {
        const client = await connectToDatabase();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const products = await collection.find({}).toArray();

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
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export default async function Home() {
    const products = await fetchProducts();

    return (
        <main className="mx-auto max-w-screen-2xl py-10 px-4 bg-light-gray-cold">
            <CardsContainer products={products} />
        </main>
    );
};
export const revalidate = 60;
