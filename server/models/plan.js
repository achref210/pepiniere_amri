import mongoose from "mongoose";

const planSchema = mongoose.Schema({
  productToPlant: String,
  type : String,
  weight: Number,
  quantity: Number,
  creator: String,
  creatorId: String,
  createdAt: Date,
  employersNumber: Number,
  description: String,
  requirements: [String],
  details: [String],
  votes: {
    type: [String],
    default: [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const Plans = mongoose.model("Plans", planSchema);

export default Plans;
