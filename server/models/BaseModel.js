const mongoose = require("mongoose");
const { model, models, Schema } = mongoose;

const schema = new Schema({
  ModelName: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  Fields: [
    {
      FieldName: String,
      Type: String,
      UIType: String,
      Required: Boolean,
      Unique: Boolean,
      Reference: String,
      RefTitle: String,
      Default: String,
      LabelValue: [],
    },
  ],
});

const BaseModel = models.BaseModel || model("BaseModel", schema, "BaseModel");

module.exports = BaseModel;
