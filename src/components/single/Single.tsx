import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { useGetProductsQuery } from '../../services/Api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cardSlice';
import { FaHeart } from 'react-icons/fa';
import Navbar from '../navbar/Navbar';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { RootState } from '../../store/store'; 
import parse from 'html-react-parser';

const Single: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetProductsQuery();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const product = data?.find((prod: any) => prod.id === Number(id));
  const isInCart = cartItems.some((item: any) => item.id === Number(id));

  useEffect(() => {
    const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
    const isProductLiked = likedProducts.some((liked: any) => liked.id === Number(id));
    setIsLiked(isProductLiked);
  }, [id]);

  const handleAddToCart = () => {
    if (isInCart) {
      setSuccessMessage("Already in Cart");
    } else if (selectedColor && product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        selectedColor,
        quantity: 1,
        price: parseFloat(product.price) || 0,
        imageLink: product.api_featured_image,
        brand: product.brand,
        category: product.category,
      }));

      setSuccessMessage(`Added 1 ${product.name} to the cart!`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } else {
      setSuccessMessage("Please select a color.");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  };
  const toggleLike = () => {
    const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
    let updatedLikes;

    if (isLiked) {
      updatedLikes = likedProducts.filter((liked: any) => liked.id !== product?.id);
    } else {
      updatedLikes = [...likedProducts, product];
    }

    localStorage.setItem('likedProducts', JSON.stringify(updatedLikes));
    setIsLiked(!isLiked);
  };

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching product details</div>;
  if (!product) return <div className="text-center">Product not found</div>;

  return (
    <div>
      <Navbar />
      <Header />
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Link to="/" className="text-blue-500 font-bold">🏠 Home</Link>
          <h2 className="text-xl font-bold">Product Details</h2>
        </div>
        <div className="flex justify-center">
          <img 
            src={product.api_featured_image} 
            alt={product.name} 
            className="max-w-[800px] h-[350px] flex mx-auto rounded-lg shadow-md" 
          />
        </div>
        <div className="ml-4 text-center">
          <h1 className="text-[30px] font-extrabold mt-4">{product.name}</h1>
          <p className="text-gray-700 mt-2">{parse(product.description)}</p>
        </div>
        <div className="mt-4 flex justify-center gap-4 items-center">
          <button
            onClick={handleAddToCart}
            className="mt-6 mb-6 w-[270px] h-[50px] bg-green-500 text-white font-bold text-[20px] py-2 px-4 rounded-lg shadow hover:bg-green-600 transition duration-200"
          >
            Add to Cart
          </button>
          <button
            onClick={toggleLike}
            className={`text-2xl focus:outline-none ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
          >
            <div className="w-[60px] h-[50px] border-2 border-gray-500 flex justify-center items-center">
              <FaHeart />
            </div>
          </button>
          {isLiked && <span className="ml-2 text-gray-600">This product has been liked!</span>}
        </div>
        <div className="mt-4">
          <label className="block text-center font-extrabold text-[20px] mb-2">Select Color:</label>
          <div className="grid grid-cols-4 gap-2">
            {product.product_colors?.map((color: any, index: number) => (
              <button
                key={index}
                style={{ backgroundColor: color.hex_value }}
                className={`p-2 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 ${selectedColor === color.hex_value ? 'ring ring-offset-2 ring-indigo-500' : ''}`}
                onClick={() => setSelectedColor(color.hex_value)}
              >
                {color.colour_name}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleAddToCart}
            className="w-[300px] h-[50px] bg-blue-500 text-white font-bold text-[20px] px-4 rounded-lg shadow hover:bg-blue-600 transition duration-200"
          >
            Select a color and then click
          </button>
        </div>
        {successMessage && <p className="text-green-500 mt-4 text-center">{successMessage}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default Single;
