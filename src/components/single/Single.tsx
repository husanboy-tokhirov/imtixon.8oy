import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useGetProductsQuery } from "../../services/Api";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cardSlice"; 

const Single: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useGetProductsQuery();
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1); 
    const [successMessage, setSuccessMessage] = useState<string | null>(null); 
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const product = data?.find((prod: any) => prod.id === Number(id));

    const handleAddToCart = () => {
        if (selectedColor && product) {
            dispatch(addToCart({ 
                ...product, 
                selectedColor, 
                quantity 
            })); 
            
            setSuccessMessage(`Added ${quantity} ${product.name || 'product'}(s) to the cart!`);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000); 
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setQuantity(value > 0 ? value : 1);
    };

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1)); 
    };

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;

    if (error) return <div className="text-center mt-10 text-red-500">Error fetching product details</div>;
    if (!product) return <div className="text-center mt-10">Product not found</div>;

    return (
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 w-[1440px] mx-auto rounded-lg shadow-lg mt-10">
            <div className="flex flex-col items-center">
                <img
                    src={product.api_featured_image}
                    alt={product.name || 'Unnamed Product'}
                    className="h-96 w-full object-contain mb-4 rounded-lg"
                    onError={(e) => { e.currentTarget.src = '/path/to/fallback-image.png'; }} 
                />
                <h1 className="text-4xl font-bold text-center mb-8 text-white"> {product.name || 'Unnamed Product'}</h1>
                <p className="text-white text-xl mb-4">
                    {product.description || 'No description available'}
                </p>
                <div className="text-white text-lg mb-4">
                    <strong>Select Color:</strong>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {product.product_colors?.map((color: any, index: number) => (
                            <div key={index} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full cursor-pointer ${selectedColor === color.hex_value ? 'ring-4 ring-yellow-300' : ''}`}
                                    style={{ backgroundColor: color.hex_value }}
                                    onClick={() => setSelectedColor(color.hex_value)}
                                />
                                <span className="font-semibold ml-2">
                                    {color.colour_name || 'Unnamed Color'}
                                </span>
                                {` (Hex: ${color.hex_value})`}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4 flex items-center gap-[40px] justify-center space-x-4">
                    <div className="flex items-center">
                        <label htmlFor="quantity" className="text-white mr-2">Quantity:</label>
                        <button
                            onClick={decrementQuantity}
                            className="bg-white text-black px-3 py-1 rounded-l hover:bg-gray-300 transition duration-300"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1" 
                            className="border text-center w-16 h-[32px] rounded-none border-gray-300"
                            readOnly 
                        />
                        <button
                            onClick={incrementQuantity}
                            className="bg-white text-black px-3 py-1 rounded-r hover:bg-gray-300 transition duration-300"
                        >
                            +
                        </button>
                    </div>
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                        onClick={handleAddToCart}
                        disabled={!selectedColor} 
                    >
                        Add to Cart
                    </button>
                </div>
                {successMessage && (
                    <div className="mt-4 text-green-500 font-bold text-lg">
                        {successMessage}
                    </div>
                )}
                <button
                    className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    onClick={() => navigate('/')} 
                >
                    Home
                </button>
            </div>
        </div>
    );
};

export default Single;
