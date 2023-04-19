import { manager } from '../routers/carts.router.js';

export async function cartProductPost(req, res) {
    try {
        const { cid, pid } = req.params;

        // Llamar al método addProductCartId2 del cartsManager
        console.log('a')
        /*  const updatedCart = await manager.addProductCartId(cid, pid);*/
        console.log('a')
        const updatedCart2 = await manager.addProductCartId2(cid, pid);
        console.log('a')

        // Devolver el carrito actualizado como respuesta
        res.json(updatedCart2);
    } catch (error) {
        // Manejar el error devuelto por el método addProductCartId
        res.status(500).json({ error: error.message });
    }
}
