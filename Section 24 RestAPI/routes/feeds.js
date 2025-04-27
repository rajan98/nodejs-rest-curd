const express = require('express');
const { body } = require('express-validator');

const feedsController = require('../controllers/feeds');

const router = express.Router();

router.get('/posts', feedsController.getPosts);
router.get('/post/:postId', feedsController.getPostById);
router.post('/post', [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5})
], feedsController.createPosts);
router.put('/post/:postId', [
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5})
], feedsController.updatePost);
router.delete('/post/:postId', feedsController.deleteById);
module.exports = router;