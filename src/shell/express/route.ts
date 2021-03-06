import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { addProduct, listProducts, newCart } from '../../core/functions';
import { Cart } from '../../core/types';
import { getCart, nextIdentity, saveCart } from "../persistence/prisma-cart-repository";

const cartRouter: Router = Router();

interface Product {
    id: string;
    name: string;
}

const products: Array<Product> = [
    {
        id: '03de41dc-81f8-4357-87c0-ec525aca12f1',
        name: 'Mouse'
    },
    {
        id: '9654be56-2041-4b1b-a680-245d7b07b3ec',
        name: 'Keyboard'
    }
];

const listCartHandler = async (request: Request, response: Response, next: NextFunction) => {
    const cartId = request.session.cartId;
    let cartProducts: Array<any> = [];

    if (cartId) {
        cartProducts = listProducts(await getCart(cartId));
    }
    response.render('index', {products, cartProducts})
};

const addProductsHandler = async (request: Request, response: Response, next: NextFunction) => {
    let cartId = request.session.cartId;
    let cart: Cart | null = null;
    const { product } = request.body;

    if (!cartId) {
        cart = newCart(nextIdentity());
        await saveCart(cart);
        cartId = cart.id;
        request.session.cartId = cartId;
    }

    if (!cart) {
        cart = await getCart(cartId);
    }

    cart = addProduct(product, cart)
    await saveCart(cart);
    response.redirect('/');
};

cartRouter.get('/', listCartHandler);
cartRouter.post('/cart', addProductsHandler);

export default cartRouter;