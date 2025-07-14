const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create
router.post('/', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Read
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const updated = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
