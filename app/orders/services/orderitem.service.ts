// import {GenericInMemoryDao} from '../dao/in.memory.product.dao';
import {queryPromise} from '../../common/postgresql.service';

export class OrderService {
    private static instance: OrderService;

    constructor() {
    }

    static getInstance(): OrderService {
        if (!OrderService.instance) {
          OrderService.instance = new OrderService();
        }
        return OrderService.instance;
    }

    createOrderItem(resource: any) {
        
    }

}