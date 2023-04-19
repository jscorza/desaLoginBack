export default class Product{
    constructor({
      id,
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail,
      status = true
    }) {
      //Verificar que los atributos requeridos se hayan pasado
       if (!title || !description || !code || !price || !stock || !category ) {
         throw new Error("falta un argumento");
       }
       
      this.id = id
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
      this.category = category;
      this.status = status;
    }
  }