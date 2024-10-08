import React from 'react';
import { useParams, Link } from "react-router-dom"; 
import { useGetProductsByBrandQuery } from "../../redux/api";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Categorys: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: products, error, isLoading } = useGetProductsByBrandQuery(id!);

    if (isLoading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-lg text-red-500">Error loading data</div>;
    }

    return (
        <>
            <Header />
            <div className="max-w-screen-xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Products in "{id}" category
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products?.map((product: any) => (
                        <div key={product.id} className="border rounded-[10px] shadow-md overflow-hidden transition-transform transform hover:scale-105">
                            <img 
                                src={product.api_featured_image} 
                                alt={product.name} 
                                className="w-full h-48 object-cover" 
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                <p className="text-md text-gray-700">Price: <span className="font-bold">${product.price}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                        Go to Home
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Categorys;
