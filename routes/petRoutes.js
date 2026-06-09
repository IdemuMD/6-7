const express = require("express");
const petController = require("../controllers/petController");

const router = express.Router();

router.get("/", petController.index);
router.get("/create", petController.createForm);
router.post("/create", petController.create);
router.get("/:id/edit", petController.editForm);
router.post("/:id/edit", petController.update);
router.post("/:id/delete", petController.remove);

module.exports = router;
