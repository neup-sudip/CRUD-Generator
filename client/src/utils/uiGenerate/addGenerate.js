const fs = require("fs");
const path = require("path");

const addGenerate = (modelName) => {
  const lowerCase = `${modelName}`.toLowerCase();

  const filePath = path.join(
    __dirname.replace("utils/uiGenerate", `components/${lowerCase}`),
    `Add${modelName}.js`
  );

  const content = `import React from "react";
    import ${modelName}Form from "./${modelName}Form";
    
    const Add${modelName} = () => {
      return <${modelName}Form />;
    };
    
    export default Add${modelName};`;

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, (err) => {
      if (err) throw err;
    });
  }
};

export default addGenerate;
