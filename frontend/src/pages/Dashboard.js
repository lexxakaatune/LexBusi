import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/user/my-orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>My Dashboard</h1>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>👤 Profile</h3>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Member Since:</strong> 2026</p>
          </div>

          <div className="dashboard-card">
            <h3>📊 Statistics</h3>
            <p><strong>Total Orders:</strong> {orders.length}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </div>
        </div>

        <div className="orders-section">
          <h2>My Orders</h2>
          {loading ? (
            <div className="text-center p-3">Loading orders...</div>
          ) : orders.length > 0 ? (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">Order #{order._id.slice(-6).toUpperCase()}</span>
                    <span className={`order-status ${order.status}`}>{order.status}</span>
                  </div>
                  <div className="order-details">
                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p><strong>Items:</strong> {order.items.length}</p>
                    <p><strong>Total:</strong> ₦{order.totalCost.toLocaleString()}</p>
                    <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
                    <p><strong>Address:</strong> {order.deliveryAddress}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-3">
              <p>No orders yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;