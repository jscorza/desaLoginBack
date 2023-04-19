import { Router } from 'express';
import { CartsManager } from '../managers/carts.manager.js';
import { pathc } from '../config/servidor.config.js';
import { cartProductPost } from '../controllers/cartProduct.post.controller.js';
import { cartProductDelete } from '../controllers/cartProduct.delete.controller.js';
import { cartProductsPut } from '../controllers/cartNewProducts.Put.controller.js';
import { cartProductsPutQuantity } from '../controllers/cartProducts.PutQuantity.controller.js';
import { cartProductDeleteAll } from '../controllers/cartProductAll.delete.controller.js';

export const routerCarts = Router();
export const manager = new CartsManager(pathc)

routerCarts.delete('/:cid/products/:pid',cartProductDelete );

routerCarts.delete('/:cid',cartProductDeleteAll);


routerCarts.post('/:cid/:pid', cartProductPost)

routerCarts.put('/:cid',cartProductsPut)

routerCarts.put('/:cid/products/:pid',cartProductsPutQuantity)


