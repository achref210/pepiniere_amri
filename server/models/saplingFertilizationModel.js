import mongoose from "mongoose";
const { Schema } = mongoose;

const saplingsFertilizationSchema = mongoose.Schema({

    id: Number,
    product: String,
    addedAt: {
        type: Date,
        default: new Date(),
      },
    voieApplication : String,
    dosesParApplication : Number,
    nombreApplication : Number,
    periodeApplication : String
  
});


const SaplingsFertilization = mongoose.model("SaplingsFertilization", saplingsFertilizationSchema);

export default SaplingsFertilization;
