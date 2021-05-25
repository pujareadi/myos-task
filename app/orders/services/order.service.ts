// import {GenericInMemoryDao} from '../dao/in.memory.product.dao';
import {queryPromise} from '../../common/postgresql.service';
import {CartService} from './cart.service'

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

    createNewOrder(user_id: number, cart_id: number, address_id: number) {
      const order_query = `INSERT INTO travelshop."order"(status, user_id, cart_id, expected_delivery_date, address_id) VALUES ('ORDER_CREATED', ${user_id}, ${cart_id}, now(), ${address_id});`
      return queryPromise(order_query)
            .then((results: any) => {
              if (!results || results.length === 0) {
                return [];
              } else{
                return results;
              }
            });
    }

    async createNewOrderItem(order_id: number, product_id: number, price: number, quantity: number) {
      const order_item_query = `INSERT INTO travelshop.order_item(order_id, product_id, quantity, unit_price, fulfilled_quantity) VALUES (${order_id}, ${product_id}, ${quantity}, ${price}, ${quantity});`
      return queryPromise(order_item_query)
            .then((results: any) => {
              if (!results || results.length === 0) {
                return [];
              } else{
                return results;
              }
            });
    }

    // Create order only with COD option
    async createOrder(user_id: number, address_id: number, cart_id: number) {
      const cartService = CartService.getInstance();
      var activeCart: any[] = await cartService.getActiveCart(user_id);
      console.log(activeCart)
      if (activeCart.length == 0 || activeCart[0].cart_id != cart_id) {
        console.log(cart_id);
        return "Order creation failed";
      }
      await this.createNewOrder(user_id, cart_id, address_id);
      const order: any = await this.getLastOrder(user_id);
      activeCart.forEach(async (cart_item) =>  { 
          await this.createNewOrderItem(Number(order.order_id), Number(cart_item.product_id), Number(cart_item.price), Number(cart_item.quantity));
      });
      return "Order created"
      
    }

    async getLastOrder(user_id: number) {
      return queryPromise(`SELECT * FROM travelshop."order" where user_id=${user_id} order by order_id desc limit 1;`)
      .then((results: any) => {
        if (!results || results.length === 0) {
          return 'No order found';
        }
        return results[0];
      });
    }

    list(user_id: number, limit: number, page: number) {
      return queryPromise(`SELECT * FROM travelshop."order" where user_id=${user_id};`)
        .then((results: any) => {
          if (!results || results.length === 0) {
            return 'No orders found';
          }
          return results;
        });
    };

  readById(order_id: number) {
    return queryPromise(`SELECT * FROM travelshop."order" p WHERE p.order_id=${order_id};`)
      .then((results: any) => {
        if (!results || results.length === 0) {
          return 'No order found';
        }
        return results;
      });
  };

}