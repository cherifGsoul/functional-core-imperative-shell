import { v4 } from 'uuid';
import {AddProduct, CartId, GenerateCartId, ListProducts, NewCart} from './types';
import { Cart, Product } from './types';

export const generateCartId: GenerateCartId = (): CartId => v4();