import { body } from 'express-validator';

export const validateLogin = [
  body('email').isEmail().notEmpty().withMessage('You need to put in a valid email'),
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 8 })
];
