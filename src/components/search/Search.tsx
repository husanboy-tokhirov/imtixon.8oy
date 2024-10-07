import beauty from "../../assets/icons/beautybaylogo.svg";
import like from "../../assets/icons/like.svg";
import bag from "../../assets/icons/bag.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; 

const Search: React.FC = () => {
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const likedProductsCount = JSON.parse(localStorage.getItem("likedProducts") || "[]").length; 

    const handleLikeClick = () => {
        navigate("/like");
    };

    const handleCartClick = () => {
        navigate("/cart"); 
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
                        className="w-full h-[40px] border border-gray-300 p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out hover:border-blue-400" 
                    />
                </div>
                <div className="flex items-center space-x-6">
                    <select className="w-[110px] h-[40px] border border-gray-300 p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out hover:border-blue-400">
                        <option defaultChecked value="1">🇬🇧 English</option>
                        <option value="2">🇷🇺 Russian</option>
                        <option value="3">🇺🇿 Uzbek</option>
                    </select>
                    <ul className="flex items-center space-x-4 text-sm font-medium text-gray-800">
                        <li className="cursor-pointer hover:text-gray-500 transition duration-150">MAYBELLINE</li>
                        <li className="cursor-pointer hover:text-gray-500 transition duration-150">COVERGIRL</li>
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
        </div>
    );
};

export default Search;
