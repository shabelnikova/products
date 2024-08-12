// "use client";
// import React, { useEffect, useState } from 'react';
// import AdminProduct from "@/components/AdminProduct";
// import { Product } from "@/types/product";
//
// const Page = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
//     const [isEditing, setIsEditing] = useState(false);
//     const [errors, setErrors] = useState<{ [key: string]: string }>({});
//     const [showForm, setShowForm] = useState(false); // Состояние для управления отображением формы
//
//     useEffect(() => {
//         const fetchProducts = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch('/api/products');
//                 const data: Product[] = await response.json();
//                 setProducts(data);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProducts();
//     }, []);
//
//     const validateForm = () => {
//         let newErrors: { [key: string]: string } = {};
//
//         if (!currentProduct.name || currentProduct.name.trim() === '') {
//             newErrors.name = 'Product name is required';
//         }
//
//         if (!currentProduct.image || currentProduct.image.trim() === '') {
//             newErrors.image = 'Product image URL is required';
//         }
//
//         if (!currentProduct.description || currentProduct.description.trim() === '') {
//             newErrors.description = 'Product description is required';
//         }
//
//         if (!currentProduct.price || isNaN(currentProduct.price)) {
//             newErrors.price = 'Product price must be a number';
//         }
//
//         if (!currentProduct.releaseDate) {
//             newErrors.releaseDate = 'Release date is required';
//         }
//
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };
//
//     const handleSave = async () => {
//         if (!validateForm()) {
//             return;
//         }
//
//         const method = isEditing ? 'PUT' : 'POST';
//         const url = isEditing ? `/api/products/${currentProduct.id}` : '/api/products';
//
//         try {
//             const response = await fetch(url, {
//                 method: method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(currentProduct),
//             });
//
//             const result = await response.json();
//
//             if (result.success) {
//                 if (isEditing) {
//                     setProducts(products.map(product => product.id === currentProduct.id ? result.product : product));
//                 } else {
//                     setProducts([...products, result.product]);
//                 }
//                 setCurrentProduct({});
//                 setIsEditing(false);
//                 setErrors({});
//                 setShowForm(false);
//             } else {
//                 console.error('Failed to save product:', result.error);
//             }
//         } catch (error) {
//             console.error('Error saving product:', error);
//         }
//     };
//
//     const handleEdit = (product: Product) => {
//         setCurrentProduct(product);
//         setIsEditing(true);
//         setErrors({});
//         setShowForm(true);
//     };
//
//     const handleAddNew = () => {
//         setCurrentProduct({});
//         setIsEditing(false);
//         setErrors({});
//         setShowForm(true);
//     };
//
//     const handleDelete = async (id: string) => {
//         try {
//             const response = await fetch(`/api/products/${id}`, {
//                 method: 'DELETE',
//             });
//
//             const result = await response.json();
//
//             if (result.success) {
//                 const updatedProducts = products.filter(product => product.id !== id);
//                 setProducts(updatedProducts);
//                 window.location.reload();
//             } else {
//                 console.error('Failed to delete product:', result.error);
//             }
//         } catch (error) {
//             console.error('Error deleting product:', error);
//         }
//     };
//
//     const handleCancel = () => {
//         setShowForm(false);
//     };
//
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <main className="mx-auto max-w-screen-2xl py-4 w-full md:w-4/5 flex flex-col gap-4">
//             {!showForm ? (
//                 <>
//                     <button onClick={handleAddNew} className="
//                     py-6 md:py-10 px-8 md:px-14 md:text-xl
//                     font-semibold md:border bg-gray-300
//                     md:rounded-lg hover:bg-gray-400/60
//                     ">
//                         Add new product
//                     </button>
//                     {products.map((product) => (
//                         <AdminProduct
//                             key={product.id}
//                             product={product}
//                             onDelete={handleDelete}
//                             onEdit={() => handleEdit(product)}
//                         />
//                     ))}
//                 </>
//             ) : (
//                 <div className="flex flex-col gap-4 p-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Product Name</label>
//                         <input
//                             type="text"
//                             value={currentProduct.name || ''}
//                             onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
//                             className="p-2 border rounded w-full"
//                         />
//                         {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//                     </div>
//
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Product Image URL</label>
//                         <input
//                             type="text"
//                             value={currentProduct.image || ''}
//                             onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
//                             className="p-2 border rounded w-full"
//                         />
//                         {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
//                     </div>
//
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Product Description</label>
//                         <textarea
//                             value={currentProduct.description || ''}
//                             onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
//                             className="p-2 border rounded w-full"
//                         />
//                         {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
//                     </div>
//
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Price</label>
//                         <input
//                             type="number"
//                             value={currentProduct.price || ''}
//                             onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
//                             className="p-2 border rounded w-full"
//                         />
//                         {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
//                     </div>
//
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Release Date</label>
//                         <input
//                             type="date"
//                             value={currentProduct.releaseDate ? new Date(currentProduct.releaseDate).toISOString().substr(0, 10) : ''}
//                             onChange={(e) => {
//                                 const date = e.target.value ? new Date(e.target.value) : null;
//                                 setCurrentProduct((prev) => ({
//                                     ...prev,
//                                     releaseDate: date
//                                 }));
//                             }}
//                             className="p-2 border rounded w-full"
//                         />
//                         {errors.releaseDate && <p className="text-red-500 text-sm">{errors.releaseDate}</p>}
//                     </div>
//
//                     <div className="flex gap-4">
//                         <button onClick={handleSave} className="py-2 px-4 bg-blue-500 text-white rounded">
//                             {isEditing ? 'Update Product' : 'Add Product'}
//                         </button>
//                         <button onClick={handleCancel} className="py-2 px-4 bg-gray-500 text-white rounded">
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </main>
//     );
// };
//
// export default Page;
"use client";
import React, { useEffect, useState } from 'react';
import AdminProduct from "@/components/AdminProduct";
import { Product } from "@/types/product";

const Page = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showForm, setShowForm] = useState(false);
    const [sortCriteria, setSortCriteria] = useState<string>('name'); // Состояние для выбора критерия сортировки

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/products');
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const sortProducts = (criteria: string) => {
        const sortedProducts = [...products].sort((a, b) => {
            if (criteria === 'name') {
                return a.name.localeCompare(b.name);
            } else if (criteria === 'price') {
                return a.price - b.price;
            } else if (criteria === 'releaseDate') {
                return new Date(a.releaseDate!).getTime() - new Date(b.releaseDate!).getTime();
            }
            return 0;
        });
        setProducts(sortedProducts);
    };

    useEffect(() => {
        sortProducts(sortCriteria);
    }, [sortCriteria]);

    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};

        if (!currentProduct.name || currentProduct.name.trim() === '') {
            newErrors.name = 'Product name is required';
        }

        if (!currentProduct.image || currentProduct.image.trim() === '') {
            newErrors.image = 'Product image URL is required';
        }

        if (!currentProduct.description || currentProduct.description.trim() === '') {
            newErrors.description = 'Product description is required';
        }

        if (!currentProduct.price || isNaN(currentProduct.price)) {
            newErrors.price = 'Product price must be a number';
        }

        if (!currentProduct.releaseDate) {
            newErrors.releaseDate = 'Release date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `/api/products/${currentProduct.id}` : '/api/products';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentProduct),
            });

            const result = await response.json();

            if (result.success) {
                if (isEditing) {
                    setProducts(products.map(product => product.id === currentProduct.id ? result.product : product));
                } else {
                    setProducts([...products, result.product]);
                }
                setCurrentProduct({});
                setIsEditing(false);
                setErrors({});
                setShowForm(false);
            } else {
                console.error('Failed to save product:', result.error);
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleEdit = (product: Product) => {
        setCurrentProduct(product);
        setIsEditing(true);
        setErrors({});
        setShowForm(true);
    };

    const handleAddNew = () => {
        setCurrentProduct({});
        setIsEditing(false);
        setErrors({});
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.success) {
                const updatedProducts = products.filter(product => product.id !== id);
                setProducts(updatedProducts);
            } else {
                console.error('Failed to delete product:', result.error);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <main className="mx-auto max-w-screen-2xl py-4 w-full md:w-4/5 flex flex-col gap-4">
            {!showForm ? (
                <>
                    <div className="flex justify-between items-center px-4 md:px-0">
                        <button onClick={handleAddNew} className="
                        py-2 md:py-4 px-4 md:px-6 text-sm md:text-xl
                        font-semibold md:border bg-gray-300
                        md:rounded-lg hover:bg-gray-400/60
                        ">
                            Add new product
                        </button>
                        <select
                            value={sortCriteria}
                            onChange={(e) => setSortCriteria(e.target.value)}
                            className="py-2 md:py-4 px-4 md:px-6 text-sm md:text-xl
                            font-semibold md:border bg-gray-300
                            md:rounded-lg"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="price">Sort by Price</option>
                            <option value="releaseDate">Sort by Release Date</option>
                        </select>
                    </div>
                    {products.map((product) => (
                        <AdminProduct
                            key={product.id}
                            product={product}
                            onDelete={handleDelete}
                            onEdit={() => handleEdit(product)}
                        />
                    ))}
                </>
            ) : (
                <div className="flex flex-col gap-4 p-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            value={currentProduct.name || ''}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                            className="p-2 border rounded w-full"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Image URL</label>
                        <input
                            type="text"
                            value={currentProduct.image || ''}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                            className="p-2 border rounded w-full"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Description</label>
                        <textarea
                            value={currentProduct.description || ''}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                            className="p-2 border rounded w-full"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            value={currentProduct.price || ''}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                            className="p-2 border rounded w-full"
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Release Date</label>
                        <input
                            type="date"
                            value={currentProduct.releaseDate ? new Date(currentProduct.releaseDate).toISOString().substr(0, 10) : ''}
                            onChange={(e) => {
                                const date = e.target.value ? new Date(e.target.value) : null;
                                setCurrentProduct((prev) => ({
                                    ...prev,
                                    releaseDate: date
                                }));
                            }}
                            className="p-2 border rounded w-full"
                        />
                        {errors.releaseDate && <p className="text-red-500 text-sm">{errors.releaseDate}</p>}
                    </div>

                    <div className="flex gap-4">
                        <button onClick={handleSave} className="py-2 px-4 bg-blue-500 text-white rounded">
                            {isEditing ? 'Update Product' : 'Add Product'}
                        </button>
                        <button onClick={handleCancel} className="py-2 px-4 bg-gray-500 text-white rounded">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Page;
