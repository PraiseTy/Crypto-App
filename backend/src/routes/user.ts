import express from 'express';
import { createUser, loginUser } from '../controllers/user';
import { validateArg, validateMiddleware } from '../middleware/validate-user';
import { validateLogin } from '../middleware/validate-login';

const router = express.Router();

router.post('/signup', validateArg, validateMiddleware, createUser);
router.post('/login', validateLogin, validateMiddleware, loginUser);

export default router;
