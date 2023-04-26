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

export const productsModel = mongoose.model('products',productSchema)