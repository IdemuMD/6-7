const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const { requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/eier", requireRole("owner"), dashboardController.ownerDashboard);
router.get("/eier/kjaeledyr/ny", requireRole("owner"), dashboardController.ownerPetCreateForm);
router.post("/eier/kjaeledyr/ny", requireRole("owner"), dashboardController.ownerPetCreate);
router.get("/veterinaer", requireRole("veterinarian"), dashboardController.veterinarianDashboard);

module.exports = router;
