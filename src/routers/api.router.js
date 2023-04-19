import { Router } from 'express';
import { postProductsController } from '../controllers/products.post.controller.js';
import { routerCarts } from './carts.router.js';

export const routerApi = Router();
routerApi.use('/carts', routerCarts)

routerApi.post('/products', postProductsController);

