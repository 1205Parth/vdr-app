const express = require('express');
const router = express.Router();
const Deal = require('../models/Deal');
const jwt = require('jsonwebtoken');

// Auth middleware
const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Create a deal
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, price, sellerId } = req.body;

        const deal = new Deal({
            title,
            description,
            price,
            buyer: req.user.userId,
            seller: sellerId
        });

        await deal.save();

        res.json({ message: 'Deal created', deal });
    } catch (err) {
        console.error('Create deal error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get deals for current user
router.get('/', auth, async (req, res) => {
    try {
        const deals = await Deal.find({
            $or: [
                { buyer: req.user.userId },
                { seller: req.user.userId }
            ]
        })
            .populate('buyer', 'name')
            .populate('seller', 'name');

        res.json(deals);
    } catch (err) {
        console.error('Get deals error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update deal status (only seller allowed)
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;

        const deal = await Deal.findById(req.params.id);
        if (!deal) return res.status(404).json({ error: 'Deal not found' });

        if (deal.seller.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        deal.status = status;
        await deal.save();

        res.json({ message: 'Status updated', deal });
    } catch (err) {
        console.error('Update status error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
