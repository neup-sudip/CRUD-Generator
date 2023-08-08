const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const test = {
  ModelName: "Product",
  Fields: [
    {
      FieldName: "Title",
      Type: "String",
      UIType: "Input",
      Required: true,
      Unique: true,
      Reference: "",
      Default: "Test Title",
      UseLabelValue: false,
      LabelValue: [Array],
    },
    {
      FieldName: "Status",
      Type: "Boolean",
      UIType: "Switch",
      Required: false,
      Unique: false,
      Reference: "",
      Default: "",
      LabelValue: [Array],
    },
  ],
};

const modelCreator = async (modelStruct) => {
  let obj = {};

  const ref = Schema.Types.ObjectId;

  modelStruct.Fields.forEach((element) => {
    const name = element.FieldName;
    obj[name] = {
      type: element.Reference ? ref : element.Type,
    };

    element.Required && (obj[name].required = element.Required);
    element.Unique && (obj[name].unique = element.Unique);
    element.Default && (obj[name].default = element.Default);
    element.Reference && (obj[name].ref = element.Reference);
  });

  const moduleName = modelStruct.ModelName;

  console.log(obj);

  const schema = new Schema(obj);

  const Model = models[moduleName] || model(moduleName, schema, moduleName);

  console.log(Model);
};

module.exports = modelCreator;
