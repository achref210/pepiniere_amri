import mongoose from "mongoose";

const emplyerSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  advance: Number,
  lastName: {
    type: "String",
  },
  job: {
    type: "String",
  },
  salary : Number,
  hiringDate: {
    type: "Date",
    default: Date.now,
  },
  absenceCount: {
    type: Number,
    default: 0,
  },
  coefficient: Number,
  CIN : String,
  phoneNumber: Number,
  adresse: {
    type: String,
  },
  workStart: {
    type: Date,
    default: new Date(),
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
