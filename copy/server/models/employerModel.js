import mongoose from "mongoose";

const emplyerSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: "String",
  },
  job: {
    type: "String",
  },
  hiringDate: {
    type: "Date",
    default: Date.now,
  },
  absenceCount: {
    type: Number,
    default: 0,
  },
  CIN: {
    type: Number,
  },
  phoneNumber: {
    type: Number,
  },
  adresse: {
    type: String,
  },
  workStart: {
    type: Date,
    default: Date.now,
  },
  workEnd: {
    type: Date,
    default: Date.now,
  },
  salary: {
    type: Number,
    default: 20,
  },
  selectedFile: String,
});

const Employers = mongoose.model("employers", emplyerSchema);
export default Employers;
