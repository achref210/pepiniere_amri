import mongoose from "mongoose";
const { Schema } = mongoose;

const saplingsSchema = mongoose.Schema({
  name: String,
  description: String,
  selectedFile: String,
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
});

const Saplings = mongoose.model("Saplings", saplingsSchema);

export default Saplings;
