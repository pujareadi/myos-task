import {CommonRoutesConfig, configureRoutes} from '../common/common.routes.config';
import {CartController} from './controllers/cart.controller';
import {UsersMiddleware} from '../common/users.middleware'

import express from 'express';

export class CartRoutes extends CommonRoutesConfig implements configureRoutes {
    constructor(app: express.Application) {
        super(app, 'CartRoute');
        this.configureRoutes();
    }

    configureRoutes() {
        const cartController = new CartController();
        const usersMiddleware = UsersMiddleware.getInstance();
        
        this.app.get(`/api/cart`, [
            usersMiddleware.validateUser,
            cartController.getActiveCart
        ]);

        this.app.post(`/api/cart`, [
            usersMiddleware.validateUser,
            cartController.updateCart
        ]);
    }


}
