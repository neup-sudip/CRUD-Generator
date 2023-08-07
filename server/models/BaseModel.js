const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const schema = Schema({
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
      Default: String,
      Enum: [{ type: String }],
      SelectField: {
        KeyField: String,
        ValueField: String,
      },
      SelectLabelValue: [
        {
          Label: String,
          Value: String,
        },
      ],
    },
  ],
});

const BaseModel = model("BaseModel", schema, "BaseModel");

module.exports = BaseModel;
