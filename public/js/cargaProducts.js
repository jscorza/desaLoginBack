// @ts-ignore
const socket = io()
const armarListado = Handlebars.compile(`
{{#if hayProductos}}
<ul>
    {{#each productos}}
    <li>Id: {{this.id}} || Title: {{this.title}}|| Stock: {{this.stock}} || Category: {{this.category}} || Price: {{this.price}}</li>
    {{/each}}
</ul>
{{else}}
<p>no hay productos para mostrar</p>
{{/if}}
`)

socket.on('products', products => {
    const hayProductos = products.length > 0
    // alert('recibi los productos: ' + JSON.stringify(videojuegos[videojuegos.length - 1]))
    const divLlistado = document.querySelector('#listado')
    if (divLlistado instanceof HTMLDivElement) {
        divLlistado.innerHTML = armarListado({
            products,
            hayProductos
        })
    }
})

// Obtener todos los botones "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Escuchar el evento "click" de cada botón
addToCartButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    // Obtener el ID del producto
    const productId = event.target.dataset.productId;
    console.log(productId)
    // Definir el ID del carrito
    const cartId = "cartb3d7217b-bfb4-4918-906e-1820e902a302";

    // Enviar una solicitud POST al servidor con el ID del producto y del carrito
    const response = await fetch(`http://127.0.0.1:8080/api/carts/${cartId}/${productId}`, {
      method: 'POST',
      mode: 'no-cors'
    });

    // Si la respuesta es exitosa, recargar la página para mostrar el carrito actualizado
    if (response.ok) {
      window.location.reload();
    }
  });
})
