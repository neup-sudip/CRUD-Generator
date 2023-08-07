const { Router } = require("express");
const router = Router();
const baseController = require("../controller/baseController");

router.post("/", baseController.create);
router.get("/list", baseController.getAll);
router.get("/:id", baseController.getOne);

module.exports = router;
