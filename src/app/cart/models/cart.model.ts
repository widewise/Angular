export class CartModel {

    get isEmpty(): boolean {
        return this.count === 0;
    }

    constructor(
        public productName: string,
        public cost: number,
        public count: number) { }
}
