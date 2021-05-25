import express from 'express';
import {OrderService} from '../services/order.service'

export class OrderController {
    constructor() {
    }

    async listOrders(req: express.Request, res: express.Response) {
        const orderService = OrderService.getInstance();
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 0;
        const user_id = 1;
        const orders = await orderService.list(user_id, limit, page);
        res.status(200).send(orders);
    }

    async getOrderById(req: express.Request, res: express.Response) {
        const orderService = OrderService.getInstance();
        const orderId = Number(req.params.orderId);
        const order = await orderService.readById(orderId);
        res.status(200).send(order);
    }

    async createOrder(req: express.Request, res: express.Response) {
        const orderService = OrderService.getInstance();
        const orderId = await orderService.createOrder(req.body);
        res.status(200).send({id: orderId});
    }


}