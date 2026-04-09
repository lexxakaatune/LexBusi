import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {product.images && product.images[0] ? (
          <img src={product.images[0]} alt={product.name} />
        ) : (
          <div className="placeholder">No Image</div>
        )}
      </div>
      <div className="product-info">
        <h4>{product.name}</h4>
        <p className="brand">{product.brand}</p>
        <p className="description">{product.description.substring(0, 60)}...</p>
        <div className="product-footer">
          <div className="price">₦{product.price.toLocaleString()}</div>
          <div className="stock-status">
            {product.stock > 0 ? (
              <span className="in-stock">In Stock</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>
        </div>
        <div className="product-actions">
          <Link to={`/product/${product._id}`} className="btn btn-secondary">
            View Details
          </Link>
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <FiShoppingCart /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;