const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    ref: "products"
  }
});

module.exports = mongoose.model("categories", CategorySchema);