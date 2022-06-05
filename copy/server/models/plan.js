import mongoose from "mongoose";

const planSchema = mongoose.Schema({
  planTitle: {
    type: String,
  },
  type: {
    type: String,
    default: "agriculture",
  },
  name: String,
  creator: String,
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
