const Order = require('../models/Order');
const Product = require('../models/Product');

const DELIVERY_FEE = 500;

exports.createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, deliveryDate, userPhone, userName } = req.body;

    if (!items || items.length === 0 || !deliveryAddress || !deliveryDate || !userPhone || !userName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let totalCost = 0;
    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      totalCost += product.price * item.quantity;
    }

    totalCost += DELIVERY_FEE;

    const order = new Order({
      userId: req.user.id,
      items,
      deliveryAddress,
      deliveryDate,
      totalCost,
      userPhone,
      userName,
      status: 'pending'
    });

    await order.save();
    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};