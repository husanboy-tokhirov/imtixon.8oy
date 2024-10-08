import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFromCart } from '../../redux/cardSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.cart); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageLink} alt={item.name} width="100" />
              <h2>{item.name}</h2>
              <p>Brand: {item.brand}</p>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Color: <span style={{ backgroundColor: item.selectedColor, padding: '0 10px' }}></span></p>
              <button onClick={() => dispatch(removeFromCart(item.id))}>Remove from Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
