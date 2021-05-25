import {CommonRoutesConfig, configureRoutes} from '../common/common.routes.config';
import {OrderController} from './controllers/order.controller';
import {UsersMiddleware} from '../common/users.middleware'

import express from 'express';

export class OrderRoutes extends CommonRoutesConfig implements configureRoutes {
    constructor(app: express.Application) {
        super(app, 'OrderRoute');
        this.configureRoutes();
    }

    configureRoutes() {
        const orderController = new OrderController();
        const usersMiddleware = UsersMiddleware.getInstance();
        this.app.get(`/api/orders`, [
            usersMiddleware.validateUser,
            orderController.listOrders
        ]);

        this.app.post(`/api/orders`, [
            usersMiddleware.validateUser,
            orderController.createOrder
        ]);
        
        this.app.get(`/api/orders/:orderId`, [
            usersMiddleware.validateUser,
            orderController.getOrderById
        ]);
    }


}
