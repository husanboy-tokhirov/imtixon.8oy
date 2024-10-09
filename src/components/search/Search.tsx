import React, { useState } from "react";
import beauty from "../../assets/icons/beautybaylogo.svg";
import like from "../../assets/icons/like.svg";
import bag from "../../assets/icons/bag.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Language from "../../store/language";
import { useGetProductsQuery } from "../../services/Api";
import Modal from "../modal/Modal"; 

interface Product {
  id: number;
  name: string;
}

const Search: React.FC = () => {
  const navigate = useNavigate();
  const { changePriceName }: any = Language();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const likedProductsCount = JSON.parse(
    localStorage.getItem("likedProducts") || "[]"
  ).length;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: products = [], isLoading } = useGetProductsQuery();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      const filteredProducts = products.filter((product: Product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProducts);
      setIsModalOpen(filteredProducts.length > 0); 
    } else {
      setSearchResults([]);
      setIsModalOpen(false); 
    }
  };

  const handleSelect = (e: any) => {
    changePriceName(e.target.value);
  };

  const handleLikeClick = () => {
    navigate("/like");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleProductSelect = (productId: number) => {
    navigate(`/product/${productId}`);
    setIsModalOpen(false); 
  };

  return (
    <div className="w-full max-w-[1440px] h-[100px] mt-4 mx-auto">
      <div className="flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-4">
          <img className="w-[100px] h-[70px]" src={beauty} alt="Beauty Logo" />
        </div>
        <div className="flex items-center w-full max-w-[800px] mx-auto relative">
          <input
            type="text"
            placeholder="Search products, brands"
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full h-[40px] border border-gray-300 p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out hover:border-blue-400"
          />
          {isLoading && (
            <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 shadow-md rounded-lg p-2 text-center">
              Loading...
            </div>
          )}
        </div>
        <div className="flex items-center space-x-6">
          <select
            onChange={(e) => handleSelect(e)}
            className="w-[110px] h-[40px] border border-gray-300 p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out hover:border-blue-400"
          >
            <option defaultChecked value="eng">
              🇬🇧 English
            </option>
            <option value="ru">🇷🇺 Russian</option>
            <option value="uz">🇺🇿 Uzbek</option>
          </select>
          <ul className="flex items-center space-x-4 text-sm font-medium text-gray-800">
            <li className="cursor-pointer hover:text-gray-500 transition duration-150">
              MAYBELLINE
            </li>
            <li className="cursor-pointer hover:text-gray-500 transition duration-150">
              COVERGIRL
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                className="w-6 h-6 cursor-pointer hover:scale-110 transition duration-150"
                src={like}
                alt="Like"
                onClick={handleLikeClick}
              />
              <div className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {likedProductsCount}
              </div>
            </div>
            <div className="relative">
              <img
                className="w-6 h-6 cursor-pointer hover:scale-110 transition duration-150"
                src={bag}
                alt="Bag"
                onClick={handleCartClick}
              />
              <div className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchResults={searchResults}
        onProductSelect={handleProductSelect}
        customStyles={{ width: "800px", height: "700px" }}
      />
    </div>
  );
};

export default Search;
