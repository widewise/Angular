export class ProductModel implements Product {
    constructor(
        public id: number = null,
        public name: string = '',
        public type: ProductType = ProductType.Mobile,
        public weight: number = 1,
        public cost: number = 100
    ) {}
}

export enum ProductType {
    Notebook = 'Notebook',
    Mobile = 'Mobile',
    PC = 'PC',
    Monitor = 'Monitor',
    Network = 'Network'
}

export interface Product {
    id: number,
    name: string,
    type: ProductType,
    weight: number,
    cost: number
}