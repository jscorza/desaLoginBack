import { manager } from '../routers/carts.router.js';

export async function cartProductsPutQuantity(req, res, next) {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    if (!quantity || typeof quantity !== 'number') {
      throw new Error('El campo "quantity" debe ser un número');
    }
    const cart = await manager.getCartById(cid);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const productIndex = cart.products.findIndex((product) => product.id === pid);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado en el carrito');
    }

    cart.products[productIndex] = {
      ...cart.products[productIndex],
      quantity: Number(quantity)
    };
    await cart.save();

    res.json(cart);
  } catch (error) {
    next(error);
  }
}
