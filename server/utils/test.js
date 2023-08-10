const controllerCreator = require("./controllerCreate");
const modelCreator = require("./modelCreate");
const routeCreator = require("./routeCreate");
const dynamicObject = {
  ModelName: "Product1",
  Fields: [
    {
      FieldName: "Title",
      Type: "String",
      UIType: "Input",
      Required: true,
      Unique: true,
      Reference: "",
      Default: "Test Title",
    },
    {
      FieldName: "Category",
      Type: "String",
      UIType: "Select",
      Required: false,
      Unique: false,
      Reference: "BaseModel",
      Default: "",
    },
    {
      FieldName: "Status",
      Type: "Boolean",
      UIType: "Switch",
      Required: false,
      Unique: false,
      Reference: "",
      Default: "false",
    },
  ],
};

modelCreator(dynamicObject);
controllerCreator(dynamicObject.ModelName);
routeCreator(dynamicObject.ModelName);
