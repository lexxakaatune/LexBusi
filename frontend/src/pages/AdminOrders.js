import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Error updating order');
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <h1>Manage Orders</h1>

        {loading ? (
          <div className="text-center p-3">Loading orders...</div>
        ) : orders.length > 0 ? (
          <div className="orders-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Items</th>
                  <th>Delivery Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>#{order._id.slice(-6).toUpperCase()}</td>
                    <td>
                      <div>
                        <strong>{order.userName}</strong>
                        <br />
                        <small>{order.userPhone}</small>
                      </div>
                    </td>
                    <td>₦{order.totalCost.toLocaleString()}</td>
                    <td>{order.items.length}</td>
                    <td>{order.deliveryDate}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="processed">Processed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-small"
                        onClick={() => alert(`Address: ${order.deliveryAddress}\n\nItems:\n${order.items.map(i => `- ${i.name} (Qty: ${i.quantity})`).join('\n')}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-3">
            <p>No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;