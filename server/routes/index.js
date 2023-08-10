const { Router } = require("express");
const router = Router();

const baseRoute = require("./baseRoute");
router.use("/model", baseRoute);

module.exports = router;
