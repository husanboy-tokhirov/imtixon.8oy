import React, { useState, useEffect } from "react";
import { useGetProductsQuery } from "../../services/Api";
import { FaHeart } from "react-icons/fa";
import basket from "../../assets/icons/basket.svg";
import Language from "../../store/language";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cardSlice";
import { RootState } from "../../store/store";

const Shelvis: React.FC = () => {
  const { price_name }: any = Language();
  const { data, error, isLoading } = useGetProductsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 3;
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [likedProducts, setLikedProducts] = useState<any[]>([]);

  useEffect(() => {
    const savedLikes = localStorage.getItem("likedProducts");
    if (savedLikes) {
      setLikedProducts(JSON.parse(savedLikes));
    }
  }, []);

  const isInCart = (productId: number) => cart.some((item) => item.id === productId);

  const handleAddToCart = (product: any) => {
    const confirmAdd = window.confirm(`Do you want to add ${product.name} to the cart?`);
    if (!isInCart(product.id) && confirmAdd) {
      dispatch(addToCart(product));
      const updatedCartItems = [...cart, product];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      alert(`${product.name} has been added to your cart.`);
    }
  };

  const toggleLike = (product: any) => {
    const isLiked = likedProducts.some((item) => item.id === product.id);
    const newLikedProducts = isLiked
      ? likedProducts.filter((item) => item.id !== product.id)
      : [...likedProducts, product];
    
    setLikedProducts(newLikedProducts);
    localStorage.setItem("likedProducts", JSON.stringify(newLikedProducts));
  };

  const handleNext = () => {
    if (currentIndex + productsPerPage < data.length) {
      setCurrentIndex((prevIndex) => prevIndex + productsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - productsPerPage);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error fetching products</div>;

  return (
    <div className="p-6 bg-gradient-to-r w-[1440px] mx-auto rounded-lg shadow-lg">
      <h1 className="text-[60px] font-bold text-center mb-[70px] text-black drop-shadow-lg">Flying off the shelves</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.slice(currentIndex, currentIndex + productsPerPage).map((product: any) => {
          const isLiked = likedProducts.some((liked) => liked.id === product.id);
          const isInCartItem = isInCart(product.id);

          return (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <div className="flex flex-col items-center">
                <img
                  src={product.api_featured_image}
                  alt={product.name || "Unnamed Product"}
                  className="h-48 w-full mb-4 rounded-lg object-cover transition duration-300"
                />
                <h2 className="text-[25px] font-semibold mb-2 text-gray-800">{product.name || "Unnamed Product"}</h2>

                <div className="flex gap-2 items-center w-full">
                  <p>Price: {price_name === "eng" ? `$${product.price}` : price_name === "ru" ? `${product.price * 95}p` : `${product.price * 12500} so'm`}</p>
                </div>

                <div className="flex gap-2 justify-between mt-2">
                  <button onClick={() => toggleLike(product)}>
                    <FaHeart
                      className={`text-2xl transition-colors duration-300 ${isLiked ? "text-red-500" : "text-gray-500"}`}
                    />
                  </button>
                  <div
                    className={`w-[55px] h-[40px] flex items-center justify-center ${isInCartItem ? "bg-red-500" : "bg-blue-500"} hover:bg-blue-700 rounded-full cursor-pointer transition duration-300`}
                    onClick={() => handleAddToCart(product)}
                  >
                    <img src={basket} alt="basket" className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className={`bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300 ${currentIndex === 0 ? "hidden" : ""}`}
          onClick={handlePrev}
        >
          Previous
        </button>
        <button
          className={`bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300 ${currentIndex + productsPerPage >= data?.length ? "hidden" : ""}`}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Shelvis;
