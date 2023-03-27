const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    email: { type: String },
    password: { type: String, min: 6 },
    firstname: { type: String, min: 1 },
    lastname: { type: String, min: 1 },
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  });
  module.exports = mongoose.model("uers", user);
