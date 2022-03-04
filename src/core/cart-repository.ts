import { Cart, CartId } from './types';

export type NextIdentity = () => CartId;
export type SaveCart = (cart: Cart) => Promise<void>;
export type GetCart = (id: CartId) => Promise<Cart>;