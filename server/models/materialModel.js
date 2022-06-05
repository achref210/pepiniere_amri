import mongoose from "mongoose";

const materialsSchema = mongoose.Schema({
  name: String,
  description:String,
  family: String,
  category: String,
  selectedFile: String,
  stock: [
    {
      id: Number,
      supplier: String,
      quantity: Number,
      dimentionX: String,
      dimentionY: String,
      quantityXY: Number,
      cost: Number,
      createdAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  comments: [{
    client:String,
    email:String,
    comment:String,
    rating:Number
  }]
});

const Materials = mongoose.model("Materials", materialsSchema);

export default Materials;