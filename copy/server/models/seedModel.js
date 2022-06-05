import mongoose from "mongoose";

const seedsSchema = mongoose.Schema({
  name: String,
  description: String,
  type: String,
  selectedFile: String,
  stock: [
    {
      supplier: String,
      createdAt: {
        type: Date,
        default: new Date(),
      },

      poidsNet: Number,
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
    },
  ],
});

const Seeds = mongoose.model("Seeds", seedsSchema);

export default Seeds;
