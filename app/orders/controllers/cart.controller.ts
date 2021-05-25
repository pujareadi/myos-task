import express from 'express';
import {CartService} from '../services/cart.service'

export class CartController {
    constructor() {
    }

    async getActiveCart(req: express.Request, res: express.Response) {
        const cartService = CartService.getInstance();
        console.log('inside cart', req.headers.user_id);
        const userId = Number(req.headers.user_id);
        console.log('inside cart')
        const cart = await cartService.getActiveCart(userId);
        console.log(cart)
        res.status(200).send(cart);
    }

    async updateCart(req: express.Request, res: express.Response) {
        const cartService = CartService.getInstance();
        const orderId = await cartService.updateCart(req.body);
        res.status(200).send({id: orderId});
    }


}