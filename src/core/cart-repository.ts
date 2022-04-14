import { Cart, CartId } from './types';

export type NextIdentity = () => CartId.CartId;
export type SaveCart = (cart: Cart.Cart) => Promise<void>;
export type GetCart = (id: CartId.CartId) => Promise<Cart.Cart>;