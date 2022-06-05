import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
  firstName: String,
  lastName : String,
  name : String,
  creatorId: String,
  description: String,
  adress: String,
  type: String,
  phoneNumber: Number,
  age: Number,
  price: Number,
  quantity: Number,
  employersNumber: Number,
  createdAt: Date,
  limitDate: Date,
  updated: Boolean,
  status: String
});

const Requests = mongoose.model("Requests", requestSchema);

export default Requests;