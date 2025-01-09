import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { handleGetRespository } from '../utils/handle-get-repository';
import { HTTP_ERRORS } from '../utils/constant';
import { Register } from '../entity/register';

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;

    const UserRepository = handleGetRespository(Register);

    const makeUser = UserRepository.create(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const saveUser = await UserRepository.save(makeUser);
    const { id, name, surname, email } = req.body;
    return res.status(HTTP_ERRORS.CREATED).json({
      message: 'User created sucessfully',
      data: { id, name, surname, email }
    });
  } catch (error) {
    return res.status(HTTP_ERRORS.BAD_REQUEST).json(error);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const UserRepository = handleGetRespository(Register);
    const getUser = await UserRepository.findOneBy({ email });

    if (!getUser) {
      return res.status(HTTP_ERRORS.NOT_FOUND).json({ message: 'This user does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, getUser.password);

    if (!isPasswordValid) {
      return res.status(HTTP_ERRORS.BAD_REQUEST).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: getUser.id, email: getUser.email }, process.env.JWT_SECRET || 'defaultsecret', {
      expiresIn: '1h'
    });

    return res.status(HTTP_ERRORS.OK).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    return res.status(HTTP_ERRORS.INTERNAL_SERVER_ERROR).json({
      message: `An error occurred while logging in: ${error}`
    });
  }
};

export { createUser, loginUser };
