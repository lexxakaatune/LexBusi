const Banner = require('../models/Banner');

exports.getBannersByPage = async (req, res) => {
  try {
    const { page } = req.params;
    const banners = await Banner.find({ page }).sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banners', error: error.message });
  }
};

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banners', error: error.message });
  }
};

exports.createBanner = async (req, res) => {
  try {
    const { title, image, page, link } = req.body;

    if (!title || !image || !page) {
      return res.status(400).json({ message: 'Title, image, and page are required' });
    }

    const banner = new Banner({ title, image, page, link });
    await banner.save();

    res.status(201).json({ message: 'Banner created', banner });
  } catch (error) {
    res.status(500).json({ message: 'Error creating banner', error: error.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { title, image, page, link } = req.body;
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      { title, image, page, link },
      { new: true }
    );

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    res.json({ message: 'Banner updated', banner });
  } catch (error) {
    res.status(500).json({ message: 'Error updating banner', error: error.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.json({ message: 'Banner deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting banner', error: error.message });
  }
};