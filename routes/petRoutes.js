const express = require("express");
const petController = require("../controllers/petController");
const { requireLogin, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", petController.index);
router.get("/create", requireLogin, petController.createForm);
router.post("/create", requireLogin, petController.create);
router.get("/:id/edit", petController.editForm);
router.post("/:id/edit", petController.update);
router.post("/:id/delete", requireRole("veterinarian"), petController.remove);

module.exports = router;
