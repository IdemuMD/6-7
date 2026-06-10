const express = require("express");
const veterinarianController = require("../controllers/veterinarianController");
const { requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", veterinarianController.index);
router.get("/create", (req, res) => res.redirect("/auth/register?role=veterinarian"));
router.post("/create", (req, res) => res.redirect("/auth/register?role=veterinarian"));
router.get("/:id/edit", veterinarianController.editForm);
router.post("/:id/edit", veterinarianController.update);
router.post("/:id/delete", requireRole("veterinarian"), veterinarianController.remove);

module.exports = router;
