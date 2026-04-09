import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'phones',
    price: '',
    description: '',
    images: [],
    stock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleImageUrlChange = (e, index) => {
    const newImages = [...formData.images];
    newImages[index] = e.target.value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageInput = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageInput = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.brand || !formData.price || !formData.description) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, formData);
        toast.success('Product updated successfully');
      } else {
        await api.post('/products', formData);
        toast.success('Product created successfully');
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Error deleting product');
      }
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      category: 'phones',
      price: '',
      description: '',
      images: [],
      stock: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Manage Products</h1>
          <button onClick={() => { setShowForm(!showForm); if(showForm) resetForm(); }} className="btn btn-primary">
            <FiPlus /> {showForm ? 'Cancel' : 'Add Product'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="admin-form">
            <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Brand *</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Apple, Samsung"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="phones">Phones</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price (₦) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  required
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>Images (URLs)</label>
              {formData.images.map((image, index) => (
                <div key={index} className="image-input-group">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageUrlChange(e, index)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImageInput(index)}
                    className="btn btn-danger btn-small"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addImageInput} className="btn btn-secondary btn-small">
                Add Image
              </button>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Product' : 'Create Product'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-outline">
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="products-list">
          {loading ? (
            <div className="text-center p-3">Loading products...</div>
          ) : products.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.category}</td>
                    <td>₦{product.price.toLocaleString()}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button
                        className="btn-action edit"
                        onClick={() => handleEdit(product)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="btn-action delete"
                        onClick={() => handleDelete(product._id)}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center p-3">
              <p>No products yet. Create one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;