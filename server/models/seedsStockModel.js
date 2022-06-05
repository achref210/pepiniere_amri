import mongoose from "mongoose";
const { Schema } = mongoose;

const seedsStockSchema = mongoose.Schema({
    id: Number,
    supplier: String,
    createdAt: {
      type: Date,
      default: new Date(),
    },
    quantity: Number,
    weight: Number,
    anneeReccolte: Date,
    germination: {
      type: Number,
      min: 0,
      max: 100,
    },
    traitement: String,
    dateFermeture: Date,
    datePeremption: Date,
    purete: {
      type: Number,
      min: 0,
      max: 100,
    },
  });

const SeedsStock = mongoose.model("SeedsStock", seedsStockSchema);

export default SeedsStock;