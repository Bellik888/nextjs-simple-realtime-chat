import { IUser } from '@/@types/user';
import User from '@/server/models/user.model';
import * as jose from 'jose';
import { generateToken } from '@/server/lib/jose';

type CreateBody = {
  name?: string;
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
  id: string;
};

const getUser = async (email: string) => {
  return await User.findOne({ email });
};

const isUserExist = async (email: string) => {
  const user = await getUser(email);
  return !!user;
};

const createUser = async (body: CreateBody) => {
  const { id, name, email } = await User.create(body);

  return {
    id,
    name,
    email,
  };
};

const authUser = async (email: string, password: string) => {
  const user = await getUser(email);

  const isValidPassword = await user?.isValidPassword(password);

  if (!isValidPassword) return null;

  return user;
};

const getToken = async (user: IUser) => {
  const { id, email } = user;
  const payload = { id, email };

  const token = await generateToken(payload);

  return token;
};

const AuthService = { createUser, isUserExist, authUser, getToken, getUser };

export default AuthService;
