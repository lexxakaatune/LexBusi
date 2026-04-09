import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  if (loading) {
    return <div className="container text-center p-3">Loading...</div>;
  }

  if (!product) {
    return <div className="container text-center p-3">Product not found</div>;
  }

  return (
    <div className="product-details-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn-back">
          <FiArrowLeft /> Go Back
        </button>

        <div className="product-details">
          <div className="product-images">
            {product.images && product.images[0] ? (
              <div className="main-image">
                <img src={product.images[0]} alt={product.name} />
              </div>
            ) : (
              <div className="placeholder">No Image Available</div>
            )}
          </div>

          <div className="product-details-info">
            <h1>{product.name}</h1>
            <p className="brand">{product.brand}</p>
            <p className="category">{product.category}</p>

            <div className="price-section">
              <h2 className="price">₦{product.price.toLocaleString()}</h2>
              <div className="stock-status">
                {product.stock > 0 ? (
                  <span className="in-stock">In Stock</span>
                ) : (
                  <span className="out-of-stock">Out of Stock</span>
                )}
              </div>
            </div>

            <p className="description">{product.description}</p>

            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="btn btn-primary btn-large"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <button className="btn btn-outline btn-large" onClick={() => navigate('/products')}>
                Continue Shopping
              </button>
            </div>

            <div className="product-specs">
              <h3>Product Information</h3>
              <ul>
                <li><strong>Brand:</strong> {product.brand}</li>
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Stock:</strong> {product.stock} available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;