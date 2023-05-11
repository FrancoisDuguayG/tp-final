const mongoose = require("mongoose");
const modelHelpers = require("./modelHelper");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
  expiration: Number,
  favorites: [Number],
});

userSchema.method('toJSON', modelHelpers.toJSON);
var userData = mongoose.model("userdata", userSchema);
module.exports = userData;
