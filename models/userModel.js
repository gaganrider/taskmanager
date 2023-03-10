const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  task:[],
  status: {
    type: String,
    default:'Pending',
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
