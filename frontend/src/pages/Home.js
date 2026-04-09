import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import api from '../utils/api';
import './Home.css';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBanners();
    fetchProducts();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await api.get('/banners/page/home');
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.slice(0, 6));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        {banners.map(banner => (
          <Banner key={banner._id} banner={banner} />
        ))}

        <section className="hero">
          <h1>Welcome to LexBusi</h1>
          <p>Your one-stop shop for premium mobile phones and accessories</p>
          <button onClick={() => navigate('/products')} className="btn btn-primary btn-lg">
            Shop Now
          </button>
        </section>

        <section className="featured-products">
          <h2>Featured Products</h2>
          {loading ? (
            <div className="text-center p-3">Loading products...</div>
          ) : (
            <div className="row">
              {products.map(product => (
                <div key={product._id} className="col-md-4">
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
                      <div className="price">₦{product.price.toLocaleString()}</div>
                      <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="btn btn-primary"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="features">
          <div className="row">
            <div className="col-md-3 text-center">
              <div className="feature-item">
                <h4>🚚 Fast Delivery</h4>
                <p>Quick and reliable delivery to your doorstep</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="feature-item">
                <h4>💳 Secure Payment</h4>
                <p>Safe and secure payment processing</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="feature-item">
                <h4>⭐ Quality Products</h4>
                <p>Only genuine and authentic products</p>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="feature-item">
                <h4>🛡️ Warranty</h4>
                <p>Full warranty on all products</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;