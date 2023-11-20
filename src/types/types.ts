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

export interface ITransaction {
  amount: number;
  createdAt: string;
  updatedAt: string | undefined;
  title: string;
  type: string;
  id: number;
  category: ICategory
}

export interface ICategory {
  title: string;
  id: number;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  transactions?: [];
}

export interface IResponseTransationLoader {
  categories: ICategory[];
  transactions: ITransaction[]
}
