const mongoose = require("mongoose");
const modelHelpers = require("./modelHelper") 
const itemSchema = mongoose.Schema({
  name: String,
  price: Number,
  image: [String],
  position: {
    addresse: String,
    longitude: Number,
    latitude: Number
  },
  categorie: String,
  description: String,
  publication_date: String,
});

itemSchema.method('toJSON', modelHelpers.toJSON);
var itemData = mongoose.model("itemdata", itemSchema);
module.exports = itemData;
