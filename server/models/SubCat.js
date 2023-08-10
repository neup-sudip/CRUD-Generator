
  const mongoose = require("mongoose"); 
 
  const { model, Schema, models } = mongoose;

  const schema = new Schema({
  "Title1": {
    type: String,
    "required": true,
    "unique": true,
    "default": "Test Title1"
  },
  "Detail1": {
    type: String
  },
  "Status1": {
    type: Boolean,
    "default": "false"
  }
});
  const SubCat = models.SubCat || model("SubCat", schema, "SubCat");

  module.exports = SubCat;
  