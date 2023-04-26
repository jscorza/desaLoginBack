import { path } from "../../config/servidor.config.js";
import Product from "../../entidades/product.js";
import { randomUUID } from 'crypto'
import { ProductsManager } from "../../managers/products.manager.js";
const manager = new ProductsManager(path)

    export async function postProductsController(req, res, next) {
        const { title, description, code, price, stock, category, status, thumbnail } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
          res.status(400).json({ error: 'Missing required fields' });
          return;
        }
        const id = randomUUID();
        const product = new Product({ id, title, description, code, price, stock, category, status, thumbnail });
        console.log(product);
        const result = await manager.addProduct(product);
      

    req['io'].sockets.emit('productos', await manager.getProducts())

    res.json(result);
}
