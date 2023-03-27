const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
  name: { type: String, min: 1 },
  price: { type: String, min: 1 },
  color: { type: String, min: 1 },
  image: { type: String, min: 1 },
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("products", product);
