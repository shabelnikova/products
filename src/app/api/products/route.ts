import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri: string = process.env.MONGODB_URI!;
const dbName: string = "products"; // Имя вашей базы данных
const collectionName: string = "items"; // Имя коллекции

export async function GET() {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const products = await collection.find({}).toArray();
    await client.close();

    return NextResponse.json(products.map(product => ({
        id: product._id.toString(),
        image: product.image,
        name: product.name,
        price: product.price,
        description: product.description,
        releaseDate: new Date(product.releaseDate), // Преобразуем дату
    })));
}