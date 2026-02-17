import {User} from './user.model';

export interface AuthData {
  token: string;
  tokenExpiration: number;
  user: User;
}

export interface RegisterRequest{
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest{
  email: string;
  password: string;
}
