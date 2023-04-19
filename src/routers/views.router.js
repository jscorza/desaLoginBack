import { Router } from 'express';
import { ProductsManager} from '../managers/products.manager.js';
import { path, pathc } from '../config/servidor.config.js';
import { getProductsController } from '../controllers/products.get.controller.js';
import { CartsManager } from '../managers/carts.manager.js';
import { getProductsController2 } from '../controllers/products.get.controllerBIS.js';

export const routerVistas = Router();
const manager = new ProductsManager(path)
const cartManager = new CartsManager(pathc)

routerVistas.get('/', getProductsController 
);

routerVistas.get('/products', getProductsController2);

routerVistas.get('/:cid',getCartsPopulated)

async function getCartsPopulated(req,res,next){
  const {cid} = req.params
  try {
    const jsonInfo = {}
    
    const productos = await cartManager.getCartProductsById(cid)
    
    res.render('carts' , {
      pageTitle: `CARRITO: ${cid}` ,
      
      hayProductos: productos.length > 0,
      productos,
      jsonInfo
      
    })
    
  } catch (error) {
    next(error)

    
  }
}
