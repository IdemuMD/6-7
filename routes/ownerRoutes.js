const express = require("express");
const ownerController = require("../controllers/ownerController");
const { requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", ownerController.index);
router.get("/create", (req, res) => res.redirect("/auth/register?role=owner"));
router.post("/create", (req, res) => res.redirect("/auth/register?role=owner"));
router.get("/:id/edit", ownerController.editForm);
router.post("/:id/edit", ownerController.update);
router.post("/:id/delete", requireRole("veterinarian"), ownerController.remove);

module.exports = router;
