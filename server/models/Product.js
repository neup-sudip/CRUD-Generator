const mongoose = require("mongoose");

const { model, Schema, models } = mongoose;

const schema = new Schema({
  Title: {
    type: String,
    required: true,
    unique: true,
    default: "Test Title",
  },
  Category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  SubCat: {
    type: Schema.Types.ObjectId,
    ref: "SubCat",
  },
});
const Product = models.Product || model("Product", schema, "Product");

module.exports = Product;
