const { Router } = require("express");
const router = Router();

const baseRoute = require("./baseRoute");

/* GET home page. */
router.use("/model", baseRoute);

module.exports = router;
