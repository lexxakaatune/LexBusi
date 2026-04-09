import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-page">
      <div className="container">
        <h1>Admin Dashboard</h1>

        <div className="admin-grid">
          <Link to="/admin/products" className="admin-card">
            <h3>📦 Manage Products</h3>
            <p>Add, edit, or delete products</p>
          </Link>

          <Link to="/admin/banners" className="admin-card">
            <h3>🎨 Manage Banners</h3>
            <p>Create and manage promotional banners</p>
          </Link>

          <Link to="/admin/orders" className="admin-card">
            <h3>📋 View Orders</h3>
            <p>Manage customer orders</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;