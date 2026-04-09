import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container text-center p-3">
        <h2>Your cart is empty</h2>
        <p>Start shopping to add items to your cart</p>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success('Item removed from cart');
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>

        <div className="cart-wrapper">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item._id}>
                    <td className="product-name">
                      <img src={item.images?.[0]} alt={item.name} />
                      <span>{item.name}</span>
                    </td>
                    <td>₦{item.price.toLocaleString()}</td>
                    <td>
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                          <FiMinus />
                        </button>
                        <input type="number" value={item.quantity} readOnly />
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                          <FiPlus />
                        </button>
                      </div>
                    </td>
                    <td>₦{(item.price * item.quantity).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn-remove"
                        onClick={() => handleRemove(item._id)}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>₦{getTotalPrice().toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Delivery Fee:</span>
              <span>₦500</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>₦{(getTotalPrice() + 500).toLocaleString()}</span>
            </div>
            <button onClick={handleCheckout} className="btn btn-primary btn-checkout">
              Proceed to Checkout
            </button>
            <button onClick={() => navigate('/products')} className="btn btn-outline">
              Continue Shopping
            </button>
            <button onClick={() => { clearCart(); toast.success('Cart cleared'); }} className="btn btn-danger">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;