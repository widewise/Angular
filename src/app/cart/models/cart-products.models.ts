import { CartModel } from './cart.model';

export class CartProductsModel {

    constructor(
        public cartProducts: Array<CartModel>,
        public totalQuantity: number,
        public totalSum: number) { }
}