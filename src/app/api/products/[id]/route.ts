import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri: string = process.env.MONGODB_URI!;
const dbName: string = "products"; // Имя вашей базы данных
const collectionName: string = "items"; // Имя коллекции

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const { id } = params;

    try {
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Product not found' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete product' });
    } finally {
        await client.close();
    }
}
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const { id } = params;

    try {
        const product = await collection.findOne({ _id: new ObjectId(id) });

        if (!product) {
            return new NextResponse(JSON.stringify({ error: 'Product not found' }));
        }

        const transformedProduct = {
            id: product._id.toString(),
            image: product.image,
            name: product.name,
            price: product.price,
            description: product.description,
            releaseDate: new Date(product.releaseDate),
        };

        return NextResponse.json(transformedProduct);
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch product' }));
    } finally {
        await client.close();
    }
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    try {
        const { id } = params;
        const product = await request.json();

        // Валидация (можно добавить больше проверок, если необходимо)
        if (!product.name || !product.price || !product.image || !product.description || !product.releaseDate) {
            return NextResponse.json({ error: 'All fields are required' });
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: product }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Product not found' });
        }

        return NextResponse.json({ success: true, product: { ...product, id } });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' });
    } finally {
        await client.close();
    }
}