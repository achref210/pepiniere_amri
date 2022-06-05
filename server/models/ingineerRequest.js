import mongoose from "mongoose";

const ingineerRequestSchema = mongoose.Schema({
  ingineerName : String,
  name: String,
  ingineer: String,
  supplier: String,
  supplierAdress: String,
  supplierNumber: Number,
  origin : String,
  price : Number,
  releaseDate: String,
  selectedFile: String,
  quantity: Number,
  totalPrice: Number,
  discount: Number,
  netPrice: Number,
  requestedAt: Date,
  receivedAt: Date,
});

const IngineerRequests = mongoose.model("IngineerRequests", ingineerRequestSchema);

export default IngineerRequests;