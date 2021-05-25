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

    createNewCart(user_id: number) {
      const query = `INSERT INTO travelshop.cart(user_id, is_active) VALUES (${user_id}, true);`;
      return queryPromise(query)
            .then((results: any) => {
              if (!results || results.length === 0) {
                return [];
              } else{
                return results;
              }
            });
    }

    updateCartItem(cart_item_id: number, quantity: number) {
      var query = `UPDATE travelshop.cart_item SET quantity=${quantity}, modified_on=now() WHERE cart_item_id=${cart_item_id}`;
      if (quantity === 0) {
          query = `DELETE FROM travelshop.cart_item WHERE cart_item_id=${cart_item_id}`;
      }
      return queryPromise(query)
            .then((results: any) => {
              if (!results || results.length === 0) {
                return [];
              } else{
                return results;
              }
            });
    }

    createNewCartItem(product_id: number, cart_id: number, quantity: number) {
      const query = `INSERT INTO travelshop.cart_item(product_id, cart_id, quantity) VALUES (${product_id},${cart_id}, ${quantity});`;
      return queryPromise(query)
            .then((results: any) => {
              console.log(results)
              if (!results || results.length === 0) {
                return [];
              } else{
                console.log('result ', results);
                return results;
              }
            });
    }

    async getOrCreateCartForUser(user_id: number) {
        var activeCart: any[] = await this.getActiveCart(user_id);
        if (activeCart.length === 0) {
            await this.createNewCart(user_id);
            activeCart = await this.getActiveCart(user_id);;
        }
        return activeCart;
    }

    async updateCart(product_id: number, quantity: number, user_id: number) {
        const cartItemArray: any[] = await this.getOrCreateCartForUser(user_id);
        const cart_item_id = cartItemArray.forEach((cart_item) => { 
          if (cart_item.product_id == product_id) {
            return cart_item.cart_item_id;
          }
        });
        if (cart_item_id == undefined) {
          return this.createNewCartItem(product_id, Number(cartItemArray[0].cart_id), quantity);
        } else {
          return this.updateCartItem(Number(cart_item_id), quantity);
        }
    }

    getActiveCart(user_id: number) {
      const query = `SELECT c.cart_id, ci.*, p.* from travelshop.cart c
                      INNER JOIN travelshop.cart_item ci on ci.cart_id=c.cart_id
                      INNER JOIN travelshop.products p on p.product_id=ci.product_id
                      WHERE c.user_id=${user_id};`
      return queryPromise(query)
        .then((results: any) => {
          if (!results || results.length === 0) {
            return [];
          }
          return results;
        });
    };

}