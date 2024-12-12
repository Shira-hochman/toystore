import {Product}from './product'
export class Basket {

    product: Product;
    amount: number;
    totalPrice: number;
    constructor(product: Product, amount: number, totalPrice: number) {
        this.amount = amount;
        this.product = product;
        this.totalPrice = totalPrice;
    }
}



