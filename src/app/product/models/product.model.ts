export class ProductModel {
    constructor(
        public id: number,
        public name: string,
        public type: ProductType,
        public weight: number,
        public cost: number,
        public count: number
    ) {}
}

export enum ProductType {
    Notebook = "Notebook",
    Mobile = "Mobile",
    PC = "PC",
    Monitor = "Monitor",
    Network = "Network"
}