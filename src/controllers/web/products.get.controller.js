import { path } from "../../config/servidor.config.js";
import { ProductsManager } from "../../managers/products.manager.js";
import querystring from "querystring";

export async function getProductsController(req, res, next) {
  const manager = new ProductsManager(path);
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort =
      req.query.sort === "asc"
        ? { price: 1 }
        : req.query.sort === "desc"
        ? { price: -1 }
        : {};
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const products = await manager.getProducts();
    let filteredProducts = []
    if(req.query.query ==null ||req.query.query == undefined ){
        filteredProducts = products   
    }else{
        products.forEach(product => {
            if(product.category === req.query.query){
                filteredProducts.push(product)
            }
        });
    }

    const sortedProducts = sort
      ? filteredProducts.sort((a, b) => {
          if (sort.price === 1) {
            return a.price - b.price;
          } else if (sort.price === -1) {
            return b.price - a.price;
          } else {
            return 0;
          }
        })
      : filteredProducts;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
    const productos = paginatedProducts;
    const totalPages = Math.ceil(filteredProducts.length / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevLink = hasPrevPage
      ? `${req.baseUrl}?${querystring.stringify({
          ...req.query,
          page: prevPage,
        })}`
      : null;
    const nextLink = hasNextPage
      ? `${req.baseUrl}?${querystring.stringify({
          ...req.query,
          page: nextPage,
        })}`
      : null;

    const jsonInfo = {
        status: "success",
        payload: paginatedProducts,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    };
    
    res.render("products", {
        pageTitle: "PRODUCTOSSSS",
        hayProductos: productos.length > 0,
        productos,
        jsonInfo
      });
  } catch (error) {
    next(error);
  }
}


