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

    createOrder(resource: any) {
        
    }

    list(user_id: number, limit: number, page: number) {
      return queryPromise(`SELECT * FROM travelshop.orders where user_id=${user_id};`)
        .then((results: any) => {
          if (!results || results.length === 0) {
            return 'No orders found';
          }
          return results;
        });
    };

  readById(order_id: number) {
    return queryPromise(`SELECT * FROM travelshop.orders p WHERE p.order_id=${order_id};`)
      .then((results: any) => {
        if (!results || results.length === 0) {
          return 'No order found';
        }
        return results;
      });
  };

}