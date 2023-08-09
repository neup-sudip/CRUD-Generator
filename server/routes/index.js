const { Router } = require("express");
const router = Router();

const baseRoute = require("./baseRoute");

// const Product1 = require("../models/Product1.js");

/* GET home page. */
router.use("/model", baseRoute);

// router.post("/post", async (req, res) => {
//   await Product1.create({
//     ...req.body,
//   });

//   return res.json({
//     result: false,
//   });
// });

module.exports = router;
