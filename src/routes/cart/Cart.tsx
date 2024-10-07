import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store"; 
import { fetchCartItems, removeFromCart } from "../../redux/cardSlice"; 
import { useNavigate } from "react-router-dom"; 

const Cart: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); 
    const navigate = useNavigate(); 
    const { items: cartItems, loading, error } = useSelector((state: RootState) => state.cart);
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        if (storedCartItems.length > 0) {
            storedCartItems.forEach((item: any) => {
                dispatch(removeFromCart(item.id)); 
            });
        }
        dispatch(fetchCartItems());
    }, [dispatch]);
    useEffect(() => {
        if (cartItems.length === 0) {
            localStorage.removeItem('cartItems');
        } else {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const handleDelete = (productId: number) => {
        dispatch(removeFromCart(productId)); 
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };

    const handleGoHome = () => {
        navigate("/"); 
    };

    if (loading) {
        return <p className="text-center text-2xl font-bold mt-[20px]">Loading cart items...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>; 
    }

    return (
        <div className="w-full max-w-[1440px] mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
            <div className="text-center mb-4">
                <button
                    onClick={handleGoHome}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    Home
                </button>
            </div>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {cartItems.map((product) => (
                        <li
                            key={product.id} 
                            className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
                        >
                            <div className="flex items-center">
                                <img
                                    src={product.image || '/path/to/default-image.jpg'} 
                                    alt={product.name || 'Product Image'} 
                                    className="w-20 h-20 object-cover rounded-lg mr-4"
                                    onError={(e) => { e.currentTarget.src = '/path/to/fallback-image.png'; }} 
                                />
                                <div>
                                    <p className="font-semibold">{product.name || 'Unnamed Product'}</p>
                                    <p>Color: {product.selectedColor || "N/A"}</p>
                                    <p>Size: {product.size || "N/A"}</p>
                                    <p>Brand: {product.brand || "N/A"}</p>
                                    <p>Category: {product.category || "N/A"}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p>Quantity: {product.quantity}</p>
                                <p>Price: ${product.price.toFixed(2)}</p>
                                <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>
                                <button
                                    className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                                    onClick={() => handleDelete(product.id)} 
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
