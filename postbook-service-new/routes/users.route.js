import express from 'express';
import userController from '../controllers/users.controller';
const router = express.Router();

// Routes
router.post('/signup', userController.createUser);
router.post('/login', userController.userLogin);
router.get('', userController.getUsers);
router.get('/:id', userController.getSingleUser);

module.exports = router;