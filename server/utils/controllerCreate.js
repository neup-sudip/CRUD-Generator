const fs = require("fs");
const path = require("path");

const controllerCreator = (moduleName) => {
  const baseName = `${moduleName}`.toLowerCase();

  const writeObj = `
  const ${moduleName} = require("../models/${moduleName}");
  
  const ${baseName}Controller = {
    create: async (req, res) => {
      const newData = await ${moduleName}.create({
        ...req.body,
      })
        .then((doc) => doc._id)
        .catch((er) => null);
  
      if (!newData) {
        return res.json({
          result: false,
          message: "Error creating ${moduleName}",
          data: "",
        });
      }
    
      return res.json({
        result: true,
        message: "${moduleName} Created Successfully",
        data: newData,
      });
    },
  
    getAll: async (req, res) => {
      const ${baseName}s = await ${moduleName}.find({})
        .then((docs) => docs)
        .catch((err) => null);
  
      if (!${baseName}s) {
        return res.json({
          result: false,
          message: "Error fetching ${moduleName}s",
          data: "",
        });
      }
  
      return res.json({
        result: true,
        message: "${moduleName}s fetched Successfully",
        data: ${baseName}s,
      });
    },
  
    getOne: async (req, res) => {
      const { id } = req.params;
      const ${baseName} = await ${moduleName}.findOne({ _id: id })
        .then((doc) => doc)
        .catch((err) => null);
  
      if (!${baseName}) {
        return res.json({
          result: false,
          message: "Error fetching ${moduleName}",
          data: "",
        });
      }
  
      return res.json({
        result: true,
        message: "${moduleName} fetched Successfully",
        data: ${baseName},
      });
    },
    update: async (req, res) => {},
    delete: async (req, res) => {},
  };
  
  module.exports = ${baseName}Controller;
  `;

  const filePath = path.join(
    __dirname.replace("utils", "controller"),
    `${baseName}Controller.js`
  );

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, writeObj, (err) => {
      if (err) throw err;
    });
  }
};

module.exports = controllerCreator;
