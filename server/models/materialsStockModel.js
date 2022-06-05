import mongoose from "mongoose";
const { Schema } = mongoose;

const materialsStockSchema = mongoose.Schema({
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

const MaterialsStock = mongoose.model("MaterialsStock", materialsStockSchema);

export default MaterialsStock;