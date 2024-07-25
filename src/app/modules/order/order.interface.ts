import { Types } from "mongoose";

export type TProductData = {
  id: Types.ObjectId;
  quantity: number;
};

export type TOrder = {
  name: string;
  phone: string;
  email: string;
  address: string;
  product: TProductData[];
};


