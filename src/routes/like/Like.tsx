import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Language from "../../store/language";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Search from "../../components/search/Search";

interface Product {
    id: number;
    name: string;
    image: string;
    description: string;
    price_sign: string;
    price: string;
}

const Like: React.FC = () => {
    const [likedProducts, setLikedProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
    const { price_name }: any = Language();

    useEffect(() => {
        const storedLikes = localStorage.getItem("likedProducts");
        if (storedLikes) {
            setLikedProducts(JSON.parse(storedLikes));
        }
    }, []);

    const handleGoHome = () => {
        navigate("/");
    };

    const handleRemoveLike = (id: number) => {
        const updatedLikes = likedProducts.filter((product) => product.id !== id);
        setLikedProducts(updatedLikes);
        localStorage.setItem("likedProducts", JSON.stringify(updatedLikes));
    };

    const calculatePrice = (price: number) => {
        if (price_name === "ru") {
            return `${price * 95}p`;
        } else if (price_name === "uz") {
            return `${price * 12500}so'm`;
        } else {
            return `${price}$`;
        }
    };

    return (
        <div>
            <Navbar />
            <Header />
            <Search />
            <div className="w-full max-w-[1440px] mx-auto p-6">
                <h1 className="text-[30px] font-bold text-center mb-[40px]">Liked Products ({likedProducts.length})</h1>
                <div className="text-center mt-6">
                    <button onClick={handleGoHome} className="bg-blue-500 mb-[40px] text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
                        Home
                    </button>
                </div>
                {likedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {likedProducts.map((product) => (
                            <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
                                <img src={product.image} alt={product.name} className="h-48 w-full mb-4 rounded-lg object-contain" />
                                <h2 className="text-[20px] font-semibold mb-2">{product.name}</h2>
                                <p className="text-gray-600 mb-2">{product.description || "No description available"}</p>
                                <div className="flex gap-2 items-center">
                                    <p className="text-gray-700 text-[20px]">{product.price_sign || "No price sign"}</p>
                                    <span className="text-red-500 text-[20px]">
                                        {calculatePrice(parseFloat(product.price)) || "No price"}
                                    </span>
                                </div>
                                <button onClick={() => handleRemoveLike(product.id)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300" >
                                    Remove from Likes
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600">You have no liked products.</div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Like;
