import { manager } from '../../routers/carts.router.js';

export async function cartProductDelete(req, res, next) {
  try {

    const { cid, pid } = req.params;

    const cart = await manager.deleteProduct(cid, pid);
    
    res.json(cart);
    

  } catch (error) {
    next(error);
  }
}
