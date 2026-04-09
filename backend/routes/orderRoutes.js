const express = require('express');
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/user/my-orders', authenticate, getUserOrders);
router.get('/', authenticate, authorize(['admin']), getAllOrders);
router.put('/:id/status', authenticate, authorize(['admin']), updateOrderStatus);

module.exports = router;