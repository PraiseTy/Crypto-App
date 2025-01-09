import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { handleGetRespository } from '../utils/handle-get-repository';
import { Register } from '../entity/register';

const validateArg = [
  body('name').notEmpty().withMessage('Your name is required'),
  body('surname').notEmpty().withMessage('Your surname is required'),
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('You need to put in a valid email')
    .custom(async (value) => {
      const UserRepository = handleGetRespository(Register);
      const user = await UserRepository.findOne({ where: { email: value } });
      if (user) {
        throw new Error('A user with this email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least eight letters'),
  body('repeatPassword')
    .notEmpty()
    .withMessage('Repeat Password is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Your passwords do not match')
];

const validateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array() });
  }
  return next();
};

export { validateArg, validateMiddleware };
