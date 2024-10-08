import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../services/Api';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cardSlice';
import like from '../../assets/icons/like.svg';
import Navbar from '../navbar/Navbar';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Single: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetProductsQuery();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const dispatch = useDispatch();

  const product = data?.find((prod: any) => prod.id === Number(id));

  const handleAddToCart = () => {
    if (selectedColor && product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        selectedColor,
        quantity: 1,
        price: parseFloat(product.price) || 0,
        imageLink: product.image_link,
        brand: product.brand,
        category: product.category,
      }));

      setSuccessMessage(`Added 1 ${product.name} to the cart!`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  };

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching product details</div>;
  if (!product) return <div className="text-center">Product not found</div>;

  return (
    <div>
      <Navbar />
      <Header />
      <div className="max-w-2xl mx-auto p-4">
        <div className='flex justify-center'>
          <div className='flex justify-center'>
            <img src={product.api_featured_image} alt={product.name} className="max-w-[800px] h-[350px] flex mx-auto rounded-lg shadow-md" />
          </div>
          <div>
            <div className="ml-4">
              <h1 className="text-[30px] text-center font-extrabold mt-4">{product.name}</h1>
              <p className="text-gray-700 text-center mt-2">{product.description}</p>
            </div>
            <div className="mt-4 flex justify-center gap-4 items-center">
              <button onClick={handleAddToCart} className="mt-6 mb-6 w-[270px] h-[50px] bg-green-500 text-white font-bold text-[20px] py-2 px-4 rounded-lg shadow hover:bg-green-600 transition duration-200" >
                Add to Cart
              </button>
              <div className="mt-1 flex justify-center items-center">
                <button
                  onClick={toggleLike}
                  className={`text-2xl focus:outline-none ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
                >
                  <div className='w-[60px] flrex justify-center items-center h-[50px] border-2 border-gray-500'>
                    <img className='ml-3 mt-3 w-[30px] h-[30px]' src={like} alt="Like" />
                  </div>
                </button>
                {isLiked && <span className="ml-2 text-gray-600">You liked this product!</span>}
              </div>
            </div>
          </div>
        </div>


        <div className="mt-4">
          <label className="block text-center font-extrabold text-[20px] text-bold mb-2">Select Color:</label>
          <div className="grid grid-cols-4 gap-2 space-x-2">
            {product.product_colors?.map((color: any, index: number) => (
              <button
                key={index}
                style={{ backgroundColor: color.hex_value }}
                className={`p-2 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50`}
                onClick={() => setSelectedColor(color.hex_value)}
              >
                {color.colour_name}
              </button>
            ))}
          </div>
        </div>



        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default Single;
