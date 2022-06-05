import mongoose from "mongoose";

const seedsSchema = mongoose.Schema({
  name: String,
  description: String,
  type: String,
  category: String,
  selectedFile: String,
  stock: [
    {
      id: Number,
      supplier: String,
      weight: Number,
      quantity: Number,
      createdAt: {
        type: Date,
        default: new Date(),
      },

      harvestYear: Date,
      germination: {
        type: Number,
        min: 0,
        max: 100,
      },
      treatment: String,
      closingDate: Date,
      expiryDate: Date,
      purity: {
        type: Number,
        min: 0,
        max: 100,
      },
    },
  ]
});

const Seeds = mongoose.model("Seeds", seedsSchema);

export default Seeds;
