import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFromCart } from '../../redux/cardSlice';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.cart);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
      <div className="text-center mb-6">
        <Link 
          to="/" 
          className="inline-block bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Go to Home
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map((item: any) => (
            <div key={item.id} className="flex items-center p-4 border rounded-lg shadow hover:shadow-md transition">
              <img src={item.image_link} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-grow ml-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">Brand: {item.brand}</p>
                <p className="text-gray-600">Category: {item.category}</p>
                <p className="text-lg font-bold">Price: ${item.price}</p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
