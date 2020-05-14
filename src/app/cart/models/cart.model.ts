import { ProductModel } from './../../product/models/product.model';

export class CartModel {

    get isEmpty(): boolean {
        return this.products.length === 0; // используйте ===
    }

    constructor(
        public products: Array<ProductModel>) { }
}
