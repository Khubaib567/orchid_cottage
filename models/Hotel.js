const mongoose = require('mongoose')
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    unique:true,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  desc: {
    type: String,
    required: true,
  },
  price:{
    type:String,
    required:true,
  },
  rooms: {
    type: [String],
  },
  featured: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Hotel", HotelSchema)