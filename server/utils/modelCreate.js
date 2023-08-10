const fs = require("fs");
const path = require("path");

const modelCreator = (modelStruct) => {
  let obj = {};

  modelStruct.Fields.forEach((element) => {
    const name = element.FieldName;
    obj[name] = {
      type: element.Reference ? "Schema.Types.ObjectId" : element.Type,
    };

    element.Required && (obj[name].required = element.Required);
    element.Unique && (obj[name].unique = element.Unique);
    element.Default && (obj[name].default = element.Default);
    element.Reference && (obj[name].ref = element.Reference);
  });

  const moduleName = modelStruct.ModelName;

  const writeObj = `const mongoose = require("mongoose"); \n 
  const { model, Schema, models } = mongoose;\n
  const schema = new Schema(${JSON.stringify(obj, null, 2)});
  const ${moduleName} = models.${moduleName} || model("${moduleName}", schema, "${moduleName}");\n
  module.exports = ${moduleName};
  `;

  const finalWrite = writeObj
    .replace(/"type": "Schema.Types.ObjectId"/g, "type: Schema.Types.ObjectId")
    .replace(/"type": "Number"/g, "type: Number")
    .replace(/"type": "String"/g, "type: String")
    .replace(/"type": "Boolean"/g, "type: Boolean");

  const filePath = path.join(
    __dirname.replace("utils", "models"),
    `${moduleName}.js`
  );

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, finalWrite, (err) => {
      if (err) throw err;
    });
  }
};

module.exports = modelCreator;
