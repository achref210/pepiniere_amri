import mongoose from "mongoose";

const refSchema = mongoose.Schema({
  name:String,
  quantity:Number,
  weight:Number,
});

const Refs = mongoose.model("Refs", refSchema);

export default Refs;