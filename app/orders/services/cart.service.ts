import {queryPromise} from '../../common/postgresql.service';

export class CartService {
    private static instance: CartService;

    constructor() {
    }

    static getInstance(): CartService {
        if (!CartService.instance) {
          CartService.instance = new CartService();
        }
        return CartService.instance;
    }

    updateCart(resource: any) {
        
    }

    getActiveCart(user_id: number) {
      const query = `SELECT c.cart_id, ci.*, p.* from travelshop.cart c
                      INNER JOIN travelshop.cart_item ci on ci.cart_id=c.cart_id
                      INNER JOIN travelshop.products p on p.product_id=ci.product_id
                      WHERE c.user_id=${user_id};`
      return queryPromise(query)
        .then((results: any) => {
          if (!results || results.length === 0) {
            return 'No order found';
          }
          return results;
        });
    };

}