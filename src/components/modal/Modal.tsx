import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchResults: any[];
  onProductSelect: (productId: number) => void;
  customStyles?: React.CSSProperties; 
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  searchResults,
  onProductSelect,
  customStyles
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative overflow-auto"
        style={customStyles}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        {searchResults.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <ul className="space-y-2">
            {searchResults.map((product) => (
              <li
                key={product.id}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => onProductSelect(product.id)}
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Modal;
