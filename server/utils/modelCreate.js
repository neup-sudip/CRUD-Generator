const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const { Schema, model, models } = mongoose;

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

  const writeObj = `
  const mongoose = require("mongoose"); \n 
  const { model, Schema, models } = mongoose;\n
  const schema = new Schema(\n${JSON.stringify(obj)})\n
  const ${moduleName} = models.${moduleName} || model("${moduleName}", schema, "${moduleName}");\n
  module.exports = ${moduleName};
  `;

  // console.log(writeObj);

  const pathhh = path.join(
    __dirname.replace("utils", "models"),
    `${moduleName}.js`
  );

  if (!fs.existsSync(pathhh)) {
    const controllerFile = fs.writeFileSync(pathhh, writeObj, (err) => {
      if (err) throw err;
    });
  }

  const schema = new Schema(obj);

  const Model = models[moduleName] || model(moduleName, schema, moduleName);
};

module.exports = modelCreator;
