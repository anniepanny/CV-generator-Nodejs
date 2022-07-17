const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
// users schema
const userSchema = new Schema({
  full_Name: {
    type: String,
    require: [true, "fullname not provided"],
  },
  email: {
    type: String,
    unique: [true, "email already exists in database"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);