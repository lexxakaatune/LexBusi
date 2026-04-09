import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import { generateWhatsAppLink } from '../utils/whatsappGenerator';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.name || '',
    userPhone: '',
    deliveryAddress: '',
    deliveryDate: ''
  });

  if (cart.length === 0) {
    return (
      <div className="container text-center p-3">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!formData.userPhone || !formData.deliveryAddress || !formData.deliveryDate) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cart,
        deliveryAddress: formData.deliveryAddress,
        deliveryDate: formData.deliveryDate,
        userPhone: formData.userPhone,
        userName: formData.userName
      };

      const response = await api.post('/orders', orderData);
      const order = response.data.order;

      const whatsappLink = generateWhatsAppLink({
        ...order,
        items: cart
      });

      clearCart();
      toast.success('Order created successfully!');

      setTimeout(() => {
        window.open(whatsappLink, '_blank');
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating order');
      setLoading(false);
    }
  };

  const subtotal = getTotalPrice();
  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        <div className="checkout-wrapper">
          <div className="checkout-form">
            <form onSubmit={handleCheckout}>
              <h3>Delivery Information</h3>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="userPhone"
                  placeholder="+234..."
                  value={formData.userPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  name="deliveryAddress"
                  placeholder="Enter your full delivery address"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Preferred Delivery Date</label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-checkout" disabled={loading}>
                {loading ? 'Processing...' : 'Complete Order'}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>

            <div className="order-items">
              <h4>Items ({cart.length})</h4>
              {cart.map(item => (
                <div key={item._id} className="order-item">
                  <div className="item-info">
                    <span>{item.name}</span>
                    <span className="quantity">x{item.quantity}</span>
                  </div>
                  <span className="item-price">₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="total-row">
                <span>Delivery Fee:</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            <p className="payment-note">
              ℹ️ After confirming your order, you'll be redirected to WhatsApp to complete the payment process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;