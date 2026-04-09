const express = require('express');
const {
  getBannersByPage,
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner
} = require('../controllers/bannerController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/page/:page', getBannersByPage);
router.get('/', authenticate, authorize(['admin']), getAllBanners);
router.post('/', authenticate, authorize(['admin']), createBanner);
router.put('/:id', authenticate, authorize(['admin']), updateBanner);
router.delete('/:id', authenticate, authorize(['admin']), deleteBanner);

module.exports = router;