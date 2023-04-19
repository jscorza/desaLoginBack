import { randomUUID } from 'crypto';
import fs from 'fs/promises'
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id:{type: String,required : true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: false},
  status: { type: Boolean, required: false},
}, { versionKey: false });


export class ProductsManager {
    #productsDb;
    #products
    #path

    constructor(path) {
        this.#productsDb = mongoose.model('products',productSchema)
        this.#path = path
        this.#products = []
    }

    async #leer() { 
        const json = await fs.readFile(this.#path, 'utf-8')
        this.#products = JSON.parse(json)
    }

    async #escribir() {
        const nuevoJson = JSON.stringify(this.#products, null, 2)
        await fs.writeFile(this.#path, nuevoJson)
    }

    async addProduct(product) {
        await this.#leer();
        const foundProduct = this.#products.find(p => p.code === product.code);
        if (foundProduct) {
          throw new Error(`El código de producto "${product.code}" ya existe en la base de datos`);
        }
        this.#products.push(product);
        await this.#escribir();
        await this.#productsDb.create(product)
        return product;
      }

    async getProducts() {
        /* await this.#leer()
        return this.#products */
        const products = await this.#productsDb.find().lean();
         return products;
    }

    async getProductById(id) {
        /* await this.#leer()
        const prod = this.#products.find(p => p.id === id)
        if (!prod) {
            throw new Error('id no encontrado')
        }
        return prod */
        const product = await this.#productsDb.findById(id).lean();
        if (!product) {
          throw new Error('id no encontrado');
        }
        return product;
    }

   /*  async updateProduct(id, atributo, nuevoValor) {
        try {
        let products = [];
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            products = JSON.parse(data);
        }
    
        const producto = products.find(producto => producto.id === id);
    
        if (!producto) {
            throw new Error('id no encontrado');
        }
    
        producto[atributo] = nuevoValor;


        console.log(`El producto con id ${id} ha sido actualizado`);
        await writeFile(this.path, JSON.stringify(products), 'utf8');
        } catch (error) {
        console.error(error);
        console.log( 'Ha ocurrido un error al actualizar el producto');
        }
    } */

    /* async replaceProduct(id, newProd) {
        await this.#leer()
        const index = this.#products.findIndex(p => p.id === id)
        if (index === -1) {
            throw new Error('id no encontrado')
        }
        this.#products[index] = newProd
        await this.#escribir()
        return newProd
    } */
    async replaceProduct(id, newProduct) {
        const replacedProduct = await this.#productsDb.findOneAndReplace(
          { _id: id },
          newProduct,
          { new: true }
        ).lean();
        if (!replacedProduct) {
          throw new Error('id no encontrado');
        }
        
        return replacedProduct;}

    async deleteProduct(id) {
        await this.#leer()
        const index = this.#products.findIndex(p => p.id === id)
        if (index === -1) {
            throw new Error('id no encontrado')
        }
        const [del] = this.#products.splice(index, 1)
        await this.#escribir()
        const deletedProduct = await this.#productsDb.findByIdAndDelete(id).lean();
        if (!deletedProduct) {
        throw new Error('id no encontrado');
        }
        return deletedProduct;
    }

    async reset() {
        this.#products = []
        await this.#escribir()
        await this.#productsDb.deleteMany();
    }
}
