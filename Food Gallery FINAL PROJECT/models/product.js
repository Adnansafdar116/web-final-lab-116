const { Decimal128 } = require("mongodb");
var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  name: String,
  price: Number,
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
