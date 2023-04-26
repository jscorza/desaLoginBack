import { Router } from 'express';
import { ProductsManager} from '../managers/products.manager.js';
import { path, pathc } from '../config/servidor.config.js';
import { getProductsController } from '../controllers/web/products.get.controller.js';
import { CartsManager } from '../managers/carts.manager.js';
import { getProductsController2 } from '../controllers/web/products.get.controllerBIS.js';
import { loginView } from '../controllers/web/login.controller.js';
import { soloAutenticados } from '../middlewares/autenticacionWeb.js';
import { profileView } from '../controllers/web/perfil.controller.js';
import { registroView } from '../controllers/web/registro.controller.js';

export const routerVistas = Router();
const manager = new ProductsManager(path)
const cartManager = new CartsManager(pathc)

routerVistas.get('/', /* getProductsController  */(req,res) =>{
  res.redirect("/login")
}
);

routerVistas.get('/products', getProductsController2);




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

routerVistas.get('/login', loginView)
routerVistas.get('/profile', soloAutenticados, profileView)
routerVistas.get('/register', registroView)
/* no me anda el populate todavia, la saco porq interfiere con todas las q son /.. :( 
routerVistas.get('/:cid',getCartsPopulated) */