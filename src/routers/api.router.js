import { Router } from 'express';
import { postProductsController } from '../controllers/api/products.post.controller.js';
import { routerCarts } from './carts.router.js';
import { postUsuarios } from '../controllers/api/usuarios.controller.js';
import { deleteSesiones, postSesiones } from '../controllers/api/sesiones.controller.js';

export const routerApi = Router();
routerApi.post('/usuarios', postUsuarios)
routerApi.post('/sesiones', postSesiones)
routerApi.delete('/sesiones',deleteSesiones)
routerApi.use('/carts', routerCarts)

routerApi.post('/products', postProductsController);

