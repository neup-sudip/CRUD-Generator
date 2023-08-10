const mongoose = require("mongoose");

const { model, Schema, models } = mongoose;

const schema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Detail: {
    type: String,
  },
  Type: {
    type: String,
  },
  Status: {
    type: Boolean,
    default: "false",
  },
});
const Category = models.Category || model("Category", schema, "Category");

module.exports = Category;
