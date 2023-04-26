import { Router } from 'express';
import { CartsManager } from '../managers/carts.manager.js';
import { pathc } from '../config/servidor.config.js';
import { cartProductPost } from '../controllers/api/cartProduct.post.controller.js';
import { cartProductDelete } from '../controllers/api/cartProduct.delete.controller.js';
import { cartProductsPut } from '../controllers/api/cartNewProducts.Put.controller.js';
import { cartProductsPutQuantity } from '../controllers/api/cartProducts.PutQuantity.controller.js';
import { cartProductDeleteAll } from '../controllers/api/cartProductAll.delete.controller.js';

export const routerCarts = Router();
export const manager = new CartsManager(pathc)

routerCarts.delete('/:cid/products/:pid',cartProductDelete );

routerCarts.delete('/:cid',cartProductDeleteAll);


routerCarts.post('/:cid/:pid', cartProductPost)

routerCarts.put('/:cid',cartProductsPut)

routerCarts.put('/:cid/products/:pid',cartProductsPutQuantity)


