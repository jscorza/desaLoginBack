import { manager } from '../../routers/carts.router.js';

export async function cartProductsPut(req, res, next) {

  function validateProductsArray(products) {
    if (!Array.isArray(products)) {
      return false;
    }

    for (const product of products) {
      if (!product.id || typeof product.id !== "string" || !product.quantity || typeof product.quantity !== "number" || !Number.isInteger(product.quantity)) {
        return false;
      }
    }

    return true;
  }

  try {
    const cid = req.params.cid;
    const { products } = req.body;

    if (!validateProductsArray(products)) {
      return res.status(400).json({ error: "El formato del array de productos es incorrecto" });
    }
    const cart = await manager.getCartById(cid);
    cart.products = products;
    await cart.save();
    res.json(cart);


  } catch (error) {
    next(error);

  }

}
