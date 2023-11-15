export interface IUserData {
  email: string;
  password: string;
}

export interface IResponseUser extends IUserData {
  createdAt: string | undefined;
  updatedAt: string | undefined;
  __v: number | undefined;
  _id: string | undefined;
  message: string | undefined;
}

export interface IResponseUserData {
  token: string;
  user: IResponseUser;
}

export interface IUser {
  id: number;
  email: string;
  token: string;
}

export interface ICategory {
  title: string;
  id: number;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  transactions: [];
}