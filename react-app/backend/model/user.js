const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  birthday: { type: String, default: null },
  address: { type: String, default: null },
  phone: { type: String, default: null },
  /* token: { type: String }, */
});

module.exports = mongoose.model("user", userSchema);
