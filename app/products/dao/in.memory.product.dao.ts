export class GenericInMemoryDao {
  private static instance: GenericInMemoryDao;
  products: any = [];

  constructor() {
      console.log('Created new instance of GenericInMemoryDao');
  }

  static getInstance(): GenericInMemoryDao {
      if (!GenericInMemoryDao.instance) {
          GenericInMemoryDao.instance = new GenericInMemoryDao();
      }
      return GenericInMemoryDao.instance;
  }

  addProduct(product: any) {
    return new Promise((resolve) => {
      product.id = this.products.length + 1;
      this.products.push(product)
      resolve(product.id);
    });
  }

  getProducts() {
    return new Promise((resolve) => {
      resolve(this.products);
    });
  }

  getProductById(productId: string) {
    return new Promise((resolve) => {
      resolve(this.products.find((product: { id: Number; }) => String(product.id) === productId));
    });
  }

}