import mongoose from "mongoose";
const { Schema } = mongoose;

const saplingsSchema = mongoose.Schema({
  name: String,
  description: String,
  selectedFile: String,
  category: String,
  sub_category: String,
  price: Number,
  type: 
    {
      type:String,
      default: "sapling",
    },
  stock: [
    {
      id: Number,
      supplier: String,
      addedAt: {
        type: Date,
        default: new Date(),
      },
      delivrable : {
        type:Boolean,
        default: "false"
      },
      status:{
        type:String,
        default: "onProgress"
      },
      age:Number,
      releaseDate:Date,
      expirationDate:Date,
      //price: Number,
      details: [String],
      quantity: Number,
      fertilizationPlan:[{
        id: Number,
        supplier: String,
        product: String,
        addedAt: {
          type: Date,
          default: new Date(),
        },
        voieApplication : String,
        dosesParApplication : Number,
        nombreApplication : Number,
        periodeApplication : Number
      }]
    },
  ],
  comments: [{
    client:String,
    email:String,
    comment:String,
    rating:Number
  }]
});

const Saplings = mongoose.model("Saplings", saplingsSchema);

export default Saplings;
