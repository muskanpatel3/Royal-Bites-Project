const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  name: String,
  description: String,
  image: String,  // Image URL or path to image
  price: Number,

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
