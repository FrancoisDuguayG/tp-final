const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
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
  
});

var userData = mongoose.model("userdata", studentSchema);
module.exports = userData;
