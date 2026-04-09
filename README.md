
# LexBusi - MERN Ecommerce Platform

A production-ready ecommerce platform for selling mobile phones and accessories built with the MERN stack.

## 🚀 Features

- ✅ Full authentication system (JWT-based)
- ✅ Product management (Admin)
- ✅ Shopping cart with persistent storage
- ✅ Secure checkout process
- ✅ WhatsApp integration for order confirmation
- ✅ Banner/Ads management
- ✅ Order tracking
- ✅ Dark/Light theme toggle
- ✅ Fully responsive design
- ✅ Role-based access control

## 📋 Tech Stack

### Backend
- Node.js + Express.js
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

### Frontend
- React 18
- React Router DOM
- Axios
- CSS3 with CSS Variables
- React Hot Toast

## 📁 Project Structure


MERN ecommerce website project setup
Copilot Chat
MERN ecommerce website project setup
You said: Build a full production‑ready MERN ecommerce website
Build a full production‑ready MERN ecommerce website named “LexBusi” that sells ONLY mobile phones and accessories. Follow all instructions exactly.

🔥 1. ARCHITECTURE REQUIREMENTS
- Use MERN stack (MongoDB, Express, React, Node.js).
- Use MVC pattern for backend.
- Use React Router for navigation.
- Use JWT authentication.
- Use bcrypt for password hashing.
- Use localStorage for:
  - Theme persistence
  - Cart persistence
  - Auth token

🎨 2. STYLING REQUIREMENTS
Global Styling Structure:
- Create a global.css file containing:
  - All CSS variables
  - Dark/light theme definitions
  - Global resets
  - Typography
  - Layout utilities
  - Color palettes

- At the top of index.css, import global.css:
@import './global.css';

- All styling must be handled through:
  - global.css (variables + global rules)
  - index.css (import + overrides)

Dark & Light Mode:
- Implement a global theme system using CSS variables.
- Theme toggle must appear:
  - In the navbar
  - In the user account settings
- Save theme preference in localStorage.

Use this structure in global.css:
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
}
[data-theme="dark"] {
  --bg-color: #000000;
  --text-color: #ffffff;
}

🖥️ 3. FRONTEND PAGES
Public Pages:
- Home page (with admin‑controlled banners/ads)
- Product listing page
- Product details page
- Login page
- Register page

User Pages:
- Cart
- Checkout (delivery date + cost calculation)
- User dashboard
- Account settings (theme toggle included)

Admin Pages:
- Admin dashboard
- Product management (add/edit/delete)
- Ads/Banners management (add/edit/delete)
- Orders list

🛒 4. CART & CHECKOUT SYSTEM
Cart:
- Add to cart
- Remove from cart
- Update quantity
- Auto‑calculate total cost

Checkout:
User must enter:
- Delivery address
- Delivery date

System must:
- Add delivery fee
- Calculate final total
- Generate order summary

WhatsApp Click‑to‑Chat (NO Cloud API):
After checkout confirmation:
Generate a WhatsApp link:
https://wa.me/number?text=<ENCODED ORDER DETAILS>

Include:
- User name
- User phone
- Delivery address
- Delivery date
- Cart items
- Total cost

Open WhatsApp with pre‑filled message.
User presses Send manually.

🔐 5. AUTHENTICATION
User Login/Register:
- Email + password only
- JWT‑based authentication
- Token stored in localStorage

Role‑Based Access:
Use a single Users collection with:
role: "admin" | "customer"
Admin routes must be protected.

🛠️ 6. ADMIN FEATURES
Admin dashboard must include:

Product Management:
- Add product
- Edit product
- Delete product
- Upload product images

Ads/Banners Management:
- Add banner
- Edit banner
- Delete banner
- Assign banners to:
  - Home page
  - Product listing page
  - Product details page

Order Management:
- View all orders
- Mark orders as processed

🗂️ 7. MONGODB SCHEMAS

User Schema:
{
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "customer" },
  createdAt: Date
}

Product Schema:
{
  name: String,
  brand: String,
  category: String,
  price: Number,
  description: String,
  images: [String],
  stock: Number,
  createdAt: Date
}

Order Schema:
{
  userId: ObjectId,
  items: [
    {
      productId: ObjectId,
      quantity: Number,
      price: Number
    }
  ],
  deliveryAddress: String,
  deliveryDate: String,
  totalCost: Number,
  status: { type: String, default: "pending" },
  createdAt: Date
}

Banner/Ads Schema:
{
  title: String,
  image: String,
  page: String,
  createdAt: Date
}

📁 8. FOLDER STRUCTURE

Backend (MVC):
/backend
  /controllers
  /models
  /routes
  /middleware
  /config
  server.js

Frontend:
/frontend
  /src
    /components
    /pages
    /context
    /hooks
    /utils
    global.css
    index.css
    App.js

📦 9. ADDITIONAL REQUIREMENTS
- Fully responsive design
- Toast notifications for actions
- Protected routes for user/admin
- Form validation
- Clean, modern UI
- All styling controlled by global.css + index.css

🚀 10. DEPLOYMENT REQUIREMENTS

GitHub Pages (Frontend):
- Add homepage field in package.json:
  "homepage": "https://yourusername.github.io/LexBusi"
- Add GitHub Pages deploy script.
- Generate a full README.md with deployment steps.
- Include a .gitignore for MERN.
- Ensure build folder is generated correctly.

Render Deployment (Backend):
- Include a render.yaml or Render‑compatible setup.
- Use production start script: "start": "node server.js"
- Use environment variables for:
  - MONGO_URI
  - JWT_SECRET
  - FRONTEND_URL
- Enable CORS for GitHub Pages domain.
- Ensure backend runs on Render without modification.

GitHub‑Ready:
- Include README.md with:
  - Project description
  - Installation steps
  - Environment variable setup
  - GitHub Pages deployment steps
  - Render deployment steps
- Include .gitignore for Node + React.
- Ensure folder structure is clean and ready to push.

🚀 11. FINAL OUTPUT
Generate:
- Full backend (Node + Express + MongoDB)
- Full frontend (React)
- All pages
- All components
- All controllers
- All routes
- All models
- All middleware
- All utilities
- Complete styling in global.css + index.css
- WhatsApp link generator
- Theme toggle system
- Admin dashboard
- User dashboard
- README.md
- .gitignore
- GitHub Pages setup
- Render deployment setup

The project must be fully functional, production‑ready, GitHub‑ready, and Render‑ready.
planning response

Copilot said: I'll build your complete production-ready MERN ecommerce
I'll build your complete production-ready MERN ecommerce platform "LexBusi" from scratch. Let me generate all necessary files organized by backend, frontend, configuration, and deployment.

📁 COMPLETE FILE STRUCTURE
BACKEND SETUP
backend/package.json
{
  "name": "lexbusi-backend",
  "version": "1.0.0",
  "description": "LexBusi Backend - Mobile & Accessories Ecommerce",
  "main": "server.js",
  "scripts": {
backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
backend/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
backend/models/Banner.js
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
backend/controllers/productController.js
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const { category, brand, search } = req.query;
    let filter = {};
backend/controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');

const DELIVERY_FEE = 500;

exports.createOrder = async (req, res) => {
backend/controllers/bannerController.js
const Banner = require('../models/Banner');

exports.getBannersByPage = async (req, res) => {
  try {
    const { page } = req.params;
    const banners = await Banner.find({ page }).sort({ createdAt: -1 });
backend/routes/authRoutes.js
const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

backend/routes/productRoutes.js
const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
backend/routes/orderRoutes.js
const express = require('express');
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
backend/routes/bannerRoutes.js
const express = require('express');
const {
  getBannersByPage,
  getAllBanners,
  createBanner,
  updateBanner,
backend/routes/userRoutes.js
const express = require('express');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
backend/.env.example
v1
MONGO_URI=mongodb://localhost:27017/lexbusi
JWT_SECRET=your_jwt_secret_key_here_change_in_production
FRONTEND_URL=http://localhost:3000
PORT=5000

FRONTEND SETUP
frontend/package.json
{
  "name": "lexbusi-frontend",
  "version": "1.0.0",
  "description": "LexBusi Frontend - Mobile & Accessories Ecommerce",
  "homepage": "https://lexxakaatune.github.io/LexBusi",
  "private": false,
frontend/src/global.css
/* ==================== CSS VARIABLES & THEME ==================== */
:root {
  --primary-color: #ff6b35;
  --secondary-color: #004e89;
  --success-color: #26a65b;
  --danger-color: #e74c3c;
frontend/src/index.css
@import './global.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
frontend/src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
frontend/src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
frontend/src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
frontend/src/hooks/useCart.js
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
frontend/src/hooks/useTheme.js
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
frontend/src/utils/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL
frontend/src/utils/whatsappGenerator.js
export const generateWhatsAppLink = (order) => {
  const message = `
🛍️ *LexBusi Order Confirmation*

👤 *Name:* ${order.userName}
📱 *Phone:* ${order.userPhone}
frontend/src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiLogOut, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../hooks/useTheme';
frontend/src/components/Navbar.css
.navbar {
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
frontend/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
frontend/src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';
import './ProductCard.css';
frontend/src/components/ProductCard.css
.product-card {
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
  border: 1px solid var(--border-color);
frontend/src/components/Banner.js
import React from 'react';
import './Banner.css';

const Banner = ({ banner }) => {
  return (
    <div className="banner">
frontend/src/components/Banner.css
.banner {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: var(--border-radius);
frontend/src/components/Footer.js
import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
frontend/src/components/Footer.css
.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  margin-top: var(--spacing-xl);
  padding: var(--spacing-lg) 0;
}
frontend/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import api from '../utils/api';
import './Home.css';

frontend/src/pages/Home.css
.home-page {
  padding: var(--spacing-lg) 0;
}

.hero {
  text-align: center;
frontend/src/pages/Products.js
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';
import './Products.css';

const Products = () => {
frontend/src/pages/Products.css
.products-page {
  padding: var(--spacing-lg) 0;
  min-height: calc(100vh - 200px);
}

.products-page h1 {
frontend/src/pages/ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import api from '../utils/api';
import toast from 'react-hot-toast';
frontend/src/pages/ProductDetails.css
.product-details-page {
  padding: var(--spacing-lg) 0;
  min-height: calc(100vh - 200px);
}

.btn-back {
frontend/src/pages/Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';
import './Cart.css';
frontend/src/pages/Cart.css
.cart-page {
  padding: var(--spacing-lg) 0;
  min-height: calc(100vh - 200px);
}

.cart-page h1 {
frontend/src/pages/Checkout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import { generateWhatsAppLink } from '../utils/whatsappGenerator';
frontend/src/pages/Checkout.css
.checkout-page {
  padding: var(--spacing-lg) 0;
  min-height: calc(100vh - 200px);
}

.checkout-page h1 {
frontend/src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './Auth.css';
frontend/src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './Auth.css';
frontend/src/pages/Auth.css
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  padding: var(--spacing-lg) var(--spacing-md);
frontend/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
frontend/src/pages/Dashboard.css
.dashboard-page {
  padding: var(--spacing-lg) 0;
  min-height: calc(100vh - 200px);
}

.dashboard-page h1 {
frontend/src/pages/AdminDashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
frontend/src/pages/AdminDashboard.css
.admin-dashboard-page {
  padding: var(--spacing-lg) 0;
  min-height: calc(100vh - 200px);
}

.admin-dashboard-page h1 {
frontend/src/pages/AdminProducts.js
v1
import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './AdminPages.css';

Are you sure?
Are you sure you wish to execute the "create_branch" tool?

 lexxakaatune accepted the action
planning response

Copilot said: Let me continue with the complete file
Let me continue with the complete file generation. I'll provide all remaining files:

frontend/src/pages/AdminProducts.js
v2
import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './AdminPages.css';

frontend/src/pages/AdminBanners.js
import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './AdminPages.css';

frontend/src/pages/AdminOrders.js
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './AdminPages.css';

const AdminOrders = () => {
frontend/src/pages/AdminPages.css
.admin-page {
  padding: var(--spacing-lg) 0;
  min-height: calc(100vh - 200px);
}

.admin-header {
frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
frontend/public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#ff6b35" />
ROOT CONFIGURATION FILES
README.md
# LexBusi - MERN Ecommerce Platform

A production-ready ecommerce platform for selling mobile phones and accessories built with the MERN stack.

## 🚀 Features

LexBusi/ ├── backend/ │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── middleware/ │ ├── config/ │ ├── server.js │ └── package.json ├── frontend/ │ ├── src/ │ │ ├── components/ │ │ ├── pages/ │ │ ├── context/ │ │ ├── hooks/ │ │ ├── utils/ │ │ ├── global.css │ │ ├── index.css │ │ └── App.js │ └── package.json ├── .gitignore └── README.md

Code

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
Install dependencies:
bash
npm install
Create .env file:
bash
cp .env.example .env
Update .env with your settings:
Code
MONGO_URI=mongodb://localhost:27017/lexbusi
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:3000
PORT=5000
Start the backend server:
bash
npm run dev
Backend will run on http://localhost:5000

Frontend Setup
Navigate to frontend directory:
bash
cd frontend
Install dependencies:
bash
npm install
Start the frontend development server:
bash
npm start
Frontend will open on http://localhost:3000

🌐 Deployment
Deploy Backend to Render
Create account on Render

Push your code to GitHub

Create new Web Service on Render:

Connect your GitHub repository
Build command: npm install
Start command: node server.js
Set environment variables from .env
Deploy!

Deploy Frontend to GitHub Pages
Update homepage in frontend/package.json:
JSON
"homepage": "https://lexxakaatune.github.io/LexBusi"
Update API URL in frontend/src/utils/api.js to your Render backend URL:
JavaScript
const API_BASE_URL = 'https://your-render-backend.onrender.com/api';
Build and deploy:
bash
cd frontend
npm run build
npm run deploy
📱 API Endpoints
Authentication
POST /api/auth/register - Register new user
POST /api/auth/login - Login user
GET /api/auth/profile - Get user profile (protected)
Products
GET /api/products - Get all products
GET /api/products/:id - Get product details
POST /api/products - Create product (admin)
PUT /api/products/:id - Update product (admin)
DELETE /api/products/:id - Delete product (admin)
Orders
POST /api/orders - Create order (protected)
GET /api/orders/user/my-orders - Get user orders (protected)
GET /api/orders - Get all orders (admin)
PUT /api/orders/:id/status - Update order status (admin)
Banners
GET /api/banners/page/:page - Get banners for page
GET /api/banners - Get all banners (admin)
POST /api/banners - Create banner (admin)
PUT /api/banners/:id - Update banner (admin)
DELETE /api/banners/:id - Delete banner (admin)
🛒 Shopping Flow
Browse Products - View all products with filtering
Product Details - See detailed information
Add to Cart - Add items with quantity selection
Review Cart - Modify quantities or remove items
Checkout - Enter delivery info
Confirm Order - Generate WhatsApp message with order details
Manual Payment - Send message via WhatsApp to complete payment
🎨 Theming
The application supports dark and light modes:

Theme preference is saved in localStorage
Toggle button in navbar and account settings
All colors defined in CSS variables in global.css
🔐 Security
Passwords hashed with bcrypt
JWT tokens for authentication
Protected routes for authenticated users
Role-based access control
Input validation on both frontend and backend
📞 WhatsApp Integration
After checkout, customers receive a link to open WhatsApp with pre-filled order details including:

Customer name and phone
Delivery address
Delivery date
Order items and total cost
Users manually send the message to complete the order.

🆘 Troubleshooting
Backend won't connect to MongoDB
Ensure MongoDB is running
Check MONGO_URI in .env
Verify network connection
CORS errors
Ensure FRONTEND_URL is correct in backend .env
Check that backend is running on correct port
Styling issues
Clear browser cache
Ensure global.css is imported in index.css
Check localStorage for old theme settings
📄 License
MIT License - feel free to use this project

👨‍💻 Author
lexxakaatune
