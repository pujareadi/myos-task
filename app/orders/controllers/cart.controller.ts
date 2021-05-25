import express from 'express';
import {CartService} from '../services/cart.service'

export class CartController {
    constructor() {
    }

    async getActiveCart(req: express.Request, res: express.Response) {
        const cartService = CartService.getInstance();
        const userId = Number(req.headers.user_id);
        const cart = await cartService.getActiveCart(userId);
        res.status(200).send(cart);
    }

    async updateCart(req: express.Request, res: express.Response) {
        const cartService = CartService.getInstance();
        const user_id = Number(req.headers.user_id);
        const product_id = Number(req.body.product_id);
        const quantity = Number(req.body.quantity);
        const cartId = await cartService.updateCart(product_id, quantity, user_id);
        res.status(200).send({'Message': "cart updated"});
    }


}