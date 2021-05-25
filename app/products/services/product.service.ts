// import {GenericInMemoryDao} from '../dao/in.memory.product.dao';
import {queryPromise} from '../../common/postgresql.service';

export class ProductService {
    private static instance: ProductService;

    constructor() {
    }

    static getInstance(): ProductService {
        if (!ProductService.instance) {
          ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }

    // create(resource: any) {
    //     return this.dao.addProduct(resource);
    // }

    list(limit: number, page: number) {
      return queryPromise('SELECT * FROM travelshop.products p WHERE p.is_active=true;')
        .then((results: any) => {
          if (!results || results.length === 0) {
            return 'No orders found';
          }
          return results;
        });
    };

  searchProducts(searchParam: string, limit: number, page: number) {
    var query = `SELECT * FROM travelshop.products p WHERE to_tsvector(p.title) @@ to_tsquery('${searchParam}') or to_tsvector(p.description) @@ to_tsquery('${searchParam}');`
    return queryPromise(query)
      .then((results: any) => {
        console.log(results);
        if (!results || results.length === 0) {
          return 'No orders found';
        }
        return results;
      });
  };  

  readById(productId: number, userId: number) {
    var query = `SELECT * FROM travelshop.products p WHERE p.product_id=${productId};`;
    if (userId) {
      query = `select p.*, cli.* from travelshop.products p
          FULL OUTER JOIN (
            SELECT ci.* from travelshop.cart c
              INNER JOIN travelshop.cart_item ci on ci.cart_id=c.cart_id
            WHERE c.user_id=${userId}
          ) cli on cli.product_id=p.product_id
          WHERE p.product_id=${productId};`
    }
    return queryPromise(query)
      .then((results: any) => {
        if (!results || results.length === 0) {
          return 'No orders found';
        }
        return results;
      });
  };

}