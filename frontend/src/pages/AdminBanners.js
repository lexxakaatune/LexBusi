import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    page: 'home',
    link: ''
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await api.get('/banners');
      setBanners(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching banners:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.image || !formData.page) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      if (editingId) {
        await api.put(`/banners/${editingId}`, formData);
        toast.success('Banner updated successfully');
      } else {
        await api.post('/banners', formData);
        toast.success('Banner created successfully');
      }
      resetForm();
      fetchBanners();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving banner');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/banners/${id}`);
        toast.success('Banner deleted');
        fetchBanners();
      } catch (error) {
        toast.error('Error deleting banner');
      }
    }
  };

  const handleEdit = (banner) => {
    setFormData(banner);
    setEditingId(banner._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image: '',
      page: 'home',
      link: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Manage Banners</h1>
          <button onClick={() => { setShowForm(!showForm); if(showForm) resetForm(); }} className="btn btn-primary">
            <FiPlus /> {showForm ? 'Cancel' : 'Add Banner'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="admin-form">
            <h3>{editingId ? 'Edit Banner' : 'Add New Banner'}</h3>

            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Banner title"
                required
              />
            </div>

            <div className="form-group">
              <label>Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/banner.jpg"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Display Page *</label>
                <select name="page" value={formData.page} onChange={handleInputChange}>
                  <option value="home">Home</option>
                  <option value="products">Products</option>
                  <option value="details">Product Details</option>
                </select>
              </div>
              <div className="form-group">
                <label>Link (Optional)</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {formData.image && (
              <div className="form-group">
                <label>Preview</label>
                <img src={formData.image} alt="Preview" className="banner-preview" />
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Banner' : 'Create Banner'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-outline">
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="banners-list">
          {loading ? (
            <div className="text-center p-3">Loading banners...</div>
          ) : banners.length > 0 ? (
            <div className="banners-grid">
              {banners.map(banner => (
                <div key={banner._id} className="banner-card">
                  <img src={banner.image} alt={banner.title} />
                  <div className="banner-info">
                    <h4>{banner.title}</h4>
                    <p className="page-badge">{banner.page}</p>
                    <div className="banner-actions">
                      <button
                        className="btn-action edit"
                        onClick={() => handleEdit(banner)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="btn-action delete"
                        onClick={() => handleDelete(banner._id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-3">
              <p>No banners yet. Create one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBanners;