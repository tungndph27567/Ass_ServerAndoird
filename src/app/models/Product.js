const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
  name: { type: String },
  price: { type: String },
  color: { type: String },
  image: { type: String },
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("products", product);
