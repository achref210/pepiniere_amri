import mongoose from "mongoose";
const { Schema } = mongoose;

const productsSchema = mongoose.Schema({
  name: String,
  description: String,
  selectedFile: String,
  type: String,
  category: String,
  sub_category: String,
  price: Number,
  stock: [
    {
      id: Number,
      supplier: String,
      age: Number,
      addedAt: {
        type: Date,
        default: new Date(),
      },
      length: Number,
      price: Number,
      details: [String],
      quantity: Number,
    },
  ],
  comments: [{
    client:String,
    email:String,
    comment:String,
    rating:Number
  }]
});

const Products = mongoose.model("Products", productsSchema);

export default Products;
