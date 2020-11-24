import express from 'express';
import checkAuth from '../middleware/check-auth';
import uploadFile from '../middleware/upload-file';
import postsController from '../controllers/posts.controller';
const router = express.Router();

// Routes
router.post('', checkAuth, uploadFile, postsController.createPost);
router.put('/:id', checkAuth, uploadFile, postsController.updatePost);
router.get('', postsController.getPosts);
router.get('/:id', postsController.getSinglePost);
router.get('/search/:query', postsController.getSearchedPosts);
router.delete('/:id', checkAuth, postsController.deletePost);

module.exports = router;