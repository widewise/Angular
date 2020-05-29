export class ProductModel {
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
