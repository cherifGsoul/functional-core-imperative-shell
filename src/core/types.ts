export type Cart = Readonly<{
    id: CartId,
    products: Products
}>

export type CartId = Readonly<string>;
export type Product = Readonly<string>
type Products = Readonly<Map<Product, number>>;

export type GenerateCartId = () => CartId

export type NewCart = (id: CartId) => Cart

export type AddProduct = (product: string, cart: Cart) => Cart;

export type ListProducts = (cart: Cart) =>  Array<{ product: string, quantity: number }>
