const express = require("express");
const veterinarianController = require("../controllers/veterinarianController");

const router = express.Router();

router.get("/", veterinarianController.index);
router.get("/create", veterinarianController.createForm);
router.post("/create", veterinarianController.create);
router.get("/:id/edit", veterinarianController.editForm);
router.post("/:id/edit", veterinarianController.update);
router.post("/:id/delete", veterinarianController.remove);

module.exports = router;
