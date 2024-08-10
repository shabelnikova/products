
import products from "@/data/products"; // Импортируйте массив продуктов

const ProductPage = ({ params }: { params: { id: string } }) => {
    const product = products.find(p => p.id === params.id);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
       <main className="mx-auto max-w-screen-2xl">
           <h1 className="text-2xl md:text-4xl font-bold p-10">{product.name}</h1>
           <div className="p-8 md:p-16 flex flex-col md:flex-row items-start gap-8 md:gap-16 ">
               <img src={product.image} alt={product.name} className="w-68 object-contain md:w-80" />
               <div className="flex flex-col gap-8 md:gap-16">
                   <p className="text-lg">{product.description}</p>
                   <p className="text-xl">Price: {product.price}</p>
                   <p className="text-md">Release Date: {product.releaseDate.toDateString()}</p>
               </div>
           </div>
       </main>
    );
};

export default ProductPage;