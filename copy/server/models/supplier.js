import mongoose from "mongoose";

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
  },
  adress: {
    type: String,
  },
  sapling: {
    nom: String,
    provenance: String,
    prix: Number,
  },
  seeds: [
    {
      nom: String,
      provenance: String,
      prix: Number,
      datePlantation: Date,
      delaisSorite: Date,
    },
  ],
  material: [
    {
      nom: String,
      provenance: String,
      prix: Number,
    },
  ],
  createdAt: Date,
});

const Suppliers = mongoose.model("Suppliers", supplierSchema);

export default Suppliers;
