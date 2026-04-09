import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiLogOut, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../hooks/useTheme';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container flex-between">
        <Link to="/" className="navbar-brand">
          <h2>LexBusi</h2>
        </Link>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin" onClick={() => setIsOpen(false)}>Admin</Link>
          )}
          {isAuthenticated && (
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
          )}
          
          <div className="navbar-actions">
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>
            
            <Link to="/cart" className="cart-icon" onClick={() => setIsOpen(false)}>
              <FiShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {isAuthenticated ? (
              <div className="user-menu">
                <span>{user?.name}</span>
                <button onClick={handleLogout} className="btn-logout">
                  <FiLogOut /> Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;