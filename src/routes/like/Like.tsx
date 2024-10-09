import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { addToCart } from "../../redux/cardSlice";
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
  const dispatch = useDispatch();

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

  const addToCartHandler = (product: Product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      quantity: 1,
      price: parseFloat(product.price) || 0,
      imageLink: product.image,
      selectedColor: "", 
    }));

    alert(`Added ${product.name} to the cart!`);
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
            Go Home
          </button>
        </div>
        {likedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {likedProducts.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-500 mb-2">{product.description}</p>
                <p className="text-gray-600 font-semibold">{product.price_sign}{product.price}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleRemoveLike(product.id)}
                    className="flex items-center text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <FaHeart className=" ml=[30px] w-[30px] h-[30px]" /> 
                  </button>
                  <button
                    onClick={() => addToCartHandler(product)}
                    className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No products liked yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Like;
