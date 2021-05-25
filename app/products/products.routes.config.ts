import {CommonRoutesConfig, configureRoutes} from '../common/common.routes.config';
import {ProductController} from './controllers/product.controller';
import {UsersMiddleware} from '../common/users.middleware'

import express from 'express';

export class ProductRoutes extends CommonRoutesConfig implements configureRoutes {
    constructor(app: express.Application) {
        super(app, 'ProductRoute');
        this.configureRoutes();
    }

    configureRoutes() {
        const productController = new ProductController();
        const usersMiddleware = UsersMiddleware.getInstance();
        this.app.get(`/api/products`, [
            productController.listProducts
        ]);

        this.app.get(`/api/products/search`, [
            productController.searchProducts
        ]);
        
        this.app.get(`/api/products/:productId`, [
            usersMiddleware.validateUser,
            productController.getProductById
        ]);

        // this.app.post(`/api/products`, [
        //     productController.createProduct
        // ]);
    }


}
