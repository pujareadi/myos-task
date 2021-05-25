import {CommonRoutesConfig, configureRoutes} from '../common/common.routes.config';
import {OrderController} from './controllers/order.controller';

import express from 'express';

export class ProductRoutes extends CommonRoutesConfig implements configureRoutes {
    constructor(app: express.Application) {
        super(app, 'ProductRoute');
        this.configureRoutes();
    }

    configureRoutes() {
        const productController = new OrderController();
        this.app.get(`/api/orders`, [
            productController.listOrders
        ]);

        // this.app.post(`/api/products`, [
        //     productController.createProduct
        // ]);
        
        this.app.get(`/api/orders/:orderId`, [
            productController.getOrderById
        ]);
    }


}
