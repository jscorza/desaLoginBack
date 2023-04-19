import fs from 'fs/promises'
import mongoose from 'mongoose';
import { ProductsManager } from './products.manager.js';
import { path } from '../config/servidor.config.js';

const cartSchema = new mongoose.Schema({
  id:{type: String,required : true },
  products:{type:Array,required:false}

}, { versionKey: false });

const productsManager = new ProductsManager(path)

export class CartsManager {
    #carts
    #path
    #cartsDb;



    constructor(path) {
        this.#path = path
        this.#carts = []
        this.#cartsDb = mongoose.model('carts',cartSchema)
    }

    async #leer() {
        const json = await fs.readFile(this.#path, 'utf-8')
        this.#carts = JSON.parse(json)
    }

    async #escribir() {
        const nuevoJson = JSON.stringify(this.#carts, null, 2)
        await fs.writeFile(this.#path, nuevoJson)
    }

    async getCarts() {
        /* await this.#leer() */
        res = await this.#cartsDb.find().lean()
        return res
    }

    async getCartProductsById(cid) {
        /* await this.#leer();
        const cart = this.#carts.find(c => c.id == id);
    
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
    
        const products = cart.products;
    
        return products; */
        const cart = await this.#cartsDb.findOne({ id: cid }).lean();
          if (!cart) {
            throw new Error('Carrito no encontrado');
          }
        
        
        return cart.products;
    }

    async addCart(cart) {
        await this.#leer();
        this.#carts.push(cart);
        await this.#escribir();
        await this.#cartsDb.create(cart)
        return cart;
      }

    
      async addProductCartId(cid, pid) {
        try {
          await this.#leer();
      
          // Buscar el carrito por su id
          const cartIndex = this.#carts.findIndex((cart) => cart.id === cid);
          if (cartIndex === -1) {
            throw new Error('Carrito no encontrado');
          }
          //me fijo que el producto exista(en productsDb)
          const prod = await productsManager.getProducts()
          const existe = prod.find((existe) => existe.id === pid)
          if(!existe){
            throw new Error(`el producto con id ${pid} no existe`)
          }
          
      
          // Buscar el producto por su id
          const productIndex = this.#carts[cartIndex].products.findIndex(
            (product) => product.id === pid
          );
      
          if (productIndex !== -1) {
            // Si el producto ya está en el carrito, aumentar su cantidad
            this.#carts[cartIndex].products[productIndex].quantity++;
          } else {
            // Si el producto no está en el carrito, agregarlo
            this.#carts[cartIndex].products.push({ id: pid, quantity: 1 });
          }
      
          await this.#escribir();
      
          return this.#carts[cartIndex];
        } catch (error) {
          throw new Error(`No se pudo agregar el producto al carrito: ${error}`);
        }
      }

      async addProductCartId2(cid, pid) {
        try {
          // Buscar el carrito por su id
          const cart = await this.#cartsDb.findOne({ id: cid });
          if (!cart) {
            throw new Error('Carrito no encontrado');
          }

          //me fijo que el producto exista(en productsDb)
          const prod = await productsManager.getProducts()
          const existe = prod.find((existe) => existe.id === pid)
          if(!existe){
            throw new Error(`el producto con id ${pid} no existe`)
          }
      
          // Buscar el producto por su id
          const product = cart.products.find((product) => product.id === pid);
          
      
          if (product) {
            // Si el producto ya está en el carrito, aumentar su cantidad
            product.quantity++;
          } else {
            // Si el producto no está en el carrito, agregarlo
            cart.products.push({ id: pid, quantity: 1 });
          }
          console.log(cart)
      
          await this.#cartsDb.findByIdAndUpdate(cart._id, { products: cart.products });
      
          return cart;
        } catch (error) {
          throw new Error(`No se pudo agregar el producto al carrito: ${error}`);
        }
      }
      




      async updateCart(id, cart) {
        return await this.#cartsDb.findByIdAndUpdate(id, cart, { new: true })
      }
    
      async deleteCart(id) {
        return await this.#cartsDb.findByIdAndDelete(id)
      }
    
      async deleteProduct(cid, pid) {
        const cart = await this.#cartsDb.findOne({ id: cid });
        
        
        if (!cart) {
          throw new Error('Carrito no encontrado')
        }
        const products = cart.products
    
        const productIndex =  products.findIndex(product => product.id === pid)
        
        if (productIndex === -1) {
          throw new Error('Producto no encontrado en el carrito')
        }
        
        console.log(productIndex)

         cart.products.splice(productIndex,1)
        await cart.save()
        
        return cart
        
       
      }

    
      async updateCartProducts(cid, products) {
        const cartIndex = this.#cartsDb.findIndex(cart => cart.id === cid)
        if (cartIndex === -1) {
          throw new Error('Carrito no encontrado')
        }
    
        if (!Array.isArray(products)) {
          throw new Error('El formato de entrada no es correcto')
        }
    
        this.#cartsDb[cartIndex].products = products
    
        await this._saveToFile()
      }
    
      async updateProductQuantity(cid, pid, quantity) {
        const cartIndex = this.#cartsDb.findIndex(cart => cart.id === cid)
        if (cartIndex === -1) {
          throw new Error('Carrito no encontrado')
        }
    
        const productIndex = this.#cartsDb[cartIndex].products.findIndex(product => product.id === pid)
        if (productIndex === -1) {
          throw new Error('Producto no encontrado en el carrito')
        }
    
        this.#cartsDb[cartIndex].products[productIndex].quantity = quantity
    
        await this._saveToFile()
      }
    
      /* async _saveToFile() {
        fs.writeFile(this.#path, JSON.stringify(this.#cartsDb), err => {
          if (err) {
            console.error(err)
          }
        })
      } */
  }
    
        
    
    
        
    
        
    