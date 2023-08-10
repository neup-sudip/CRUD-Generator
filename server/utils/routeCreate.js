const fs = require("fs");
const path = require("path");

const routeManager = (baseName) => {
  const route = `${baseName}Route`;
  const filePath = path.join(__dirname.replace("utils", "routes"), `index.js`);

  const content = fs.readFileSync(filePath, "utf8");

  const modifiedContent = content.replace(
    "module.exports = router;",
    `const ${route} = require("./${route}");\nrouter.use("/${baseName}", ${route});\nmodule.exports = router;`
  );

  fs.writeFileSync(filePath, modifiedContent, "utf8");
};

const routeCreator = (moduleName) => {
  const baseName = `${moduleName}`.toLowerCase();

  const fileName = `${baseName}Controller`;

  const writeObj = `
    const { Router } = require("express");
    const router = Router();
    const ${fileName} = require("../controller/${fileName}");

    router.post("/", ${fileName}.create);
    router.get("/list", ${fileName}.getAll);
    router.get("/:id", ${fileName}.getOne);

    module.exports = router;`;

  const filePath = path.join(
    __dirname.replace("utils", "routes"),
    `${baseName}Route.js`
  );

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, writeObj, (err) => {
      if (err) throw err;
    });
  }

  routeManager(baseName);
};

module.exports = routeCreator;
