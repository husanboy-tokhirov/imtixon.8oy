import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useGetProductsQuery } from "../../services/Api";

const Hero: React.FC = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const [visibleCount, setVisibleCount] = useState(3); 

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 3); 
  };

  const handleShowLess = () => {
    setVisibleCount(prevCount => Math.max(prevCount - 3, 3)); 
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  if (error) return <div className="text-center mt-10 text-red-500">Error fetching products</div>;

  return (
    <div className="p-6 bg-gradient-to-r mt-10 from-blue-500 to-purple-500 w-[1440px] mx-auto rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.slice(0, visibleCount).map((product: any) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <Link to={`/product/${product.id}`}> 
              <div className="flex flex-col items-center">
                <img 
                  src={product.api_featured_image} 
                  alt={product.name || 'Unnamed Product'} 
                  className="h-48 w-full object-cover mb-4 rounded-lg" 
                  onError={(e) => { e.currentTarget.src = '/path/to/fallback-image.png'; }} 
                />
                <h2 className="text-[25px] font-semibold mb-2">{product.name || 'Unnamed Product'}</h2>
                <p className="text-gray-700 text-sm mb-2">{product.description || 'No description available'}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        {visibleCount < (data?.length || 0) && (
          <button 
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300 mr-2"
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}
        {visibleCount > 3 && ( 
          <button 
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
