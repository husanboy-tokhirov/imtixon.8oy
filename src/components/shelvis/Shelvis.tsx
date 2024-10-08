import React, { useState, useEffect } from "react";
import { useGetProductsQuery } from "../../services/Api";
import like from "../../assets/icons/like.svg";
import basket from "../../assets/icons/basket.svg";
import Language from "../../store/language";

const Shelvis: React.FC = () => {
    const { price_name }: any = Language();
    const { data, error, isLoading } = useGetProductsQuery();
    const [currentIndex, setCurrentIndex] = useState(0);
    const productsPerPage = 3;
    const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
    const [likedProducts, setLikedProducts] = useState<any[]>(() => {
        const savedLikes = localStorage.getItem("likedProducts");
        return savedLikes ? JSON.parse(savedLikes) : [];
    });

    useEffect(() => {
        const savedLikes = localStorage.getItem("likedProducts");
        if (savedLikes) {
            setLikedProducts(JSON.parse(savedLikes));
        }
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + productsPerPage, data.length - productsPerPage)
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            Math.max(prevIndex - productsPerPage, 0)
        );
    };

    const toggleDescription = (productId: number) => {
        setExpandedProductId((prevId) => (prevId === productId ? null : productId));
    };

    const toggleLike = (product: any) => {
        const isLiked = likedProducts.find((item) => item.id === product.id);
        let newLikedProducts;

        if (isLiked) {
            newLikedProducts = likedProducts.filter((item) => item.id !== product.id);
        } else {
            newLikedProducts = [
                ...likedProducts,
                {
                    id: product.id,
                    name: product.name,
                    image: product.api_featured_image,
                    description: product.description,
                    price_sign: product.price_sign,
                    price: product.price,
                },
            ];
        }

        setLikedProducts(newLikedProducts);
        localStorage.setItem("likedProducts", JSON.stringify(newLikedProducts));
    };
    const handleAddToCart = (product: any) => {
        const confirmAdd = window.confirm(`Do you want to add ${product.name} to the cart?`);
        
        if (confirmAdd) {
            alert(`${product.name} has been added to your cart.`);
        }
    };

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;

    if (error) return <div className="text-center mt-10 text-red-500">Error fetching products</div>;

    return (
        <div className="p-6 bg-gradient-to-r w-[1440px] mx-auto rounded-lg shadow-lg">
            <h1 className="text-[60px] font-bold text-center mb-[70px] text-black drop-shadow-lg">Flying off the shelves</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.slice(currentIndex, currentIndex + productsPerPage).map((product: any) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        <div className="flex flex-col items-center">
                            <img
                                src={product.api_featured_image}
                                alt={product.name || 'Unnamed Product'}
                                className="h-48 w-full mb-4 rounded-lg object-cover transition duration-300"
                                onError={(e) => { e.currentTarget.src = '/path/to/fallback-image.png'; }}
                            />
                            <h2 className="text-[25px] font-semibold mb-2 text-gray-800">{product.name || 'Unnamed Product'}</h2>
                            <div className="mb-2">
                                <p className={`text-gray-600 text-sm ${expandedProductId === product.id ? '' : 'h-12 overflow-hidden'}`}>
                                    {product.description || 'No description available'}
                                </p>
                                <button
                                    className="text-blue-500 text-sm"
                                    onClick={() => toggleDescription(product.id)}
                                >
                                    {expandedProductId === product.id ? 'Show Less' : 'Read More'}
                                </button>
                            </div>

                            <div className="flex gap-2 items-center w-full p-2">
                                <div className="flex gap-2 items-center w-full">
                                    <p>Price: {price_name === 'eng' ? `${product.price}$` : price_name === 'ru' ? `${product.price * 95}p` : `${product.price * 12500}so'm`}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <img
                                        src={like}
                                        alt="like"
                                        className={`cursor-pointer ${likedProducts.some(item => item.id === product.id) ? 'text-red-500' : 'text-gray-500'}`} 
                                        onClick={() => toggleLike(product)} 
                                        style={{ filter: likedProducts.some(item => item.id === product.id) ? 'grayscale(0%)' : 'grayscale(100%)', transition: 'filter 0.3s' }} 
                                    />
                                    <div 
                                        className="w-[55px] flex items-center justify-center h-[40px] bg-black rounded-full cursor-pointer"
                                        onClick={() => handleAddToCart(product)} 
                                    >
                                        <img src={basket} alt="basket" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-6">
                <button
                    className={`bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300 ${currentIndex === 0 ? 'hidden' : ''}`}
                    onClick={handlePrev}
                >
                    Previous
                </button>
                <button
                    className={`bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300 ${currentIndex + productsPerPage >= (data?.length || 0) ? 'hidden' : ''}`}
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Shelvis;
