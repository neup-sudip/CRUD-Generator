
  const mongoose = require("mongoose"); 
 
  const { model, Schema, models } = mongoose;

  const schema = new Schema(
{"Title":{"type":"String","required":true,"unique":true,"default":"Test Title"},"Category":{"required":true,"ref":"Test"},"Status":{"type":"Boolean","default":"false"}})

  const Product1 = models.Product1 || model("Product1", schema, "Product1");

  module.exports = Product1;
  