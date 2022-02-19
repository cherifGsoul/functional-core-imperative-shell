import express, {Request, Response, NextFunction, Application} from 'express';
const session = require('express-session')
const bodyParser = require('body-parser');
import path from "path";
import {addProduct, Cart, listProducts, newCart} from './core';
import {getCart, saveCart} from "./db";

const app: Application = express();
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '..',  'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(session({
    secret: 'foobarbaz',
    resave: true,
    saveUninitialized: false
}));

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

declare module 'express-session' {
    export interface SessionData {
        cartId:  string
    }
}

app.get('/', async (request: Request, response: Response, next: NextFunction) => {
    const cartId = request.session.cartId;
    let cartProducts: Array<any> = [];

    if (cartId) {
        cartProducts = listProducts(await getCart(cartId));
    }
    response.render('index', {products, cartProducts})
});

app.post('/cart', async (request: Request, response: Response, next: NextFunction) => {
    let cartId = request.session.cartId;
    let cart: Cart;
    const {product} = request.body;

    if (!cartId) {
        cart = newCart();
        await saveCart(cart);
        cartId = cart.id;
        request.session.cartId = cartId;
    }

    cart = await getCart(cartId);
    cart = addProduct(product, cart)
    await saveCart(cart);
    response.redirect('/');
});

app.listen(3000, () => {
    console.log(`Functional Core Imperative Shell running on port 3000`)
});