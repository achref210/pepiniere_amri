import mongoose from "mongoose";

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
  },
  adress: {
    type: String,
  },
  phoneNumber: Number,
  selectedFile: String,
  saplings: [{
    selectedFile: String,
    name: String,
    origin: String,
    price: Number,
    addedAt:
    {
      type: Date,
      default: new Date
    },
    releaseDate: {
      type: Date,
      default: new Date
    }
  },],
  seeds: [
    {
      selectedFile: String,
      name: String,
      origin: String,
      price: Number,
      addedAt:
    {
      type: Date,
      default: new Date
    },
    releaseDate: {
      type: Date,
      default: new Date
    }
    },
  ],
  materials: [
    {
      selectedFile: String,
      name: String,
      addedAt:
    {
      type: Date,
      default: new Date
    },
    releaseDate: {
      type: Date,
      default: new Date
    }
    },
  ],
  createdAt: Date,
});

const Suppliers = mongoose.model("Suppliers", supplierSchema);

export default Suppliers;
