import mongoose from "mongoose";
const { Schema } = mongoose;

const saplingsStockSchema = mongoose.Schema({
  id: Number,
  product: String,
  voieApplication: String,
  age: Number,
  addedAt: {
    type: Date,
    default: new Date(),
  },
  length: Number,
  price: Number,
  details: [String],
  quantity: Number,
});

const SaplingsStock = mongoose.model("SaplingsStock", saplingsStockSchema);

export default SaplingsStock;
