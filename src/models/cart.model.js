import mongoose from 'mongoose';
const cartSchema = new mongoose.Schema({
    id:{type: String,required : true },
    products:{type:Array,required:false}
  
  }, { versionKey: false });
  export  const cartModel = mongoose.model('carts',cartSchema)