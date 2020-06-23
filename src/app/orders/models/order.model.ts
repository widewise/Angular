export class OrderModel {
    constructor(
        public id: number = null,
        public fistName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public isCollect: boolean,
        public address: string
    ) {}
}