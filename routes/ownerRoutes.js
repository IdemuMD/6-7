const express = require("express");
const ownerController = require("../controllers/ownerController");

const router = express.Router();

router.get("/", ownerController.index);
router.get("/create", ownerController.createForm);
router.post("/create", ownerController.create);
router.get("/:id/edit", ownerController.editForm);
router.post("/:id/edit", ownerController.update);
router.post("/:id/delete", ownerController.remove);

module.exports = router;
