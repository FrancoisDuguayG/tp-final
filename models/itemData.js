const mongoose = require("mongoose");
const modelHelpers = require("./modelHelper") 
const itemSchema = mongoose.Schema({
  name: String,
  price: Number,
  images: [String],
  position: {
    adresse: String
  },
  categorie: String,
  description: String,
  publication_date: String,
});

itemSchema.method('toJSON', modelHelpers.toJSON);
var itemData = mongoose.model("itemdata", itemSchema);
module.exports = itemData;
