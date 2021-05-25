import express from 'express';
import {ProductService} from '../services/product.service'

export class ProductController {
    constructor() {
    }

    async listProducts(req: express.Request, res: express.Response) {
        const productsService = ProductService.getInstance();
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 0;
        const products = await productsService.list(limit, page);
        res.status(200).send(products);
    }

    async searchProducts(req: express.Request, res: express.Response) {
        const searchString = String(req.query.q).trim().replace(/\s+/g, ' ').split(' ').join('|');
        const productsService = ProductService.getInstance();
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 0;
        const products = await productsService.searchProducts(searchString, limit, page);
        res.status(200).send(products);
    }

    async getProductById(req: express.Request, res: express.Response) {
        const productsService = ProductService.getInstance();
        const productId = Number(req.params.productId);
        const userId = Number(req.headers.userId);
        const product = await productsService.readById(productId, userId);
        res.status(200).send(product);
    }

    // async createProduct(req: express.Request, res: express.Response) {
    //     const productsService = ProductService.getInstance();
    //     const productId = await productsService.create(req.body);
    //     res.status(200).send({id: productId});
    // }


}