import { Types } from "mongoose";

export type TProduct = {
  title: string;
  image: string;
  price: number;
  quantity: number;
  rating?: number;
  description: string;
  briefDescription: string;
  categories: Types.ObjectId[];
  featured: boolean
};