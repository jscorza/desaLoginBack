import { manager } from '../../routers/carts.router.js';

export async function cartProductDeleteAll(req, res, next) {
  const { cid } = req.params;
  try {
    const cart = await manager.getCartById(cid);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    cart.products = [];
    await cart.save();

    res.json(cart);
  } catch (error) {
    next(error);
  }
}
