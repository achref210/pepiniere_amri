import mongoose from "mongoose";
import geocoder from "../utils/geocoder.js"

const geoSchema = mongoose.Schema({
  name: String,
  address: String,
  latitude: Number,
  longitude: Number
});

//Geoccode & create location

const Geo = mongoose.model("Geo", geoSchema);

export default Geo;

/*import mongoose from "mongoose";
import geocoder from "../utils/geocoder.js"

const geoSchema = mongoose.Schema({
  geoId: {
    type: String,
    //unique:[true,"please add geo"]
    trim:true,
    maxlength: [10]
  },
  address: String,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//Geoccode & create location
geoSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address)
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  }
  this.address=undefined;
  next();
});

const Geo = mongoose.model("Geo", geoSchema);

export default Geo;*/
