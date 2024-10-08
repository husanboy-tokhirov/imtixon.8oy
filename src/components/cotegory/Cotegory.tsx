import React from 'react';
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../services/Api";

interface Product {
  brand: string;
}

const Category: React.FC = () => {
    const { data: products, error, isLoading } = useGetProductsQuery();

    if (isLoading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <div className="text-center text-lg text-red-500">Error loading categories</div>;

    const brands = Array.from(new Set(products?.filter((product: Product) => product.brand).map((product: Product) => product.brand)));

    return (
        <section className="bg-gray-100 w-[1440px] mx-auto py-10">
            <div className="max-w-screen-xl mx-auto px-4">
                <h1 className="text-4xl md:text-6xl mb-6 text-center font-extrabold text-gray-800">Categories</h1>
                <div className="flex flex-wrap items-center justify-center gap-6">
                    {brands.map((brand: any, index) => (
                        <Link 
                            key={index} 
                            to={`/category/${encodeURIComponent(brand.toLowerCase())}`} 
                            className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
                        >
                            <span className="text-lg font-semibold text-gray-700 cursor-pointer">
                                {brand}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;
