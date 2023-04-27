const express = require("express");
const router = express.Router();
const authenticateAdmin = require("../middlewares/authenticateAdmin");
const adminController = require("../controllers/admin-controller");

router.get("/", authenticateAdmin, adminController.getAllUser);
router.get("/", authenticateAdmin, adminController.getUserInfo);
router.post("/", adminController.loginAdmin);
router.patch("/", authenticateAdmin, adminController.editUserInfo);
router.delete("/", authenticateAdmin, adminController.deleteUserInfo);

module.exports = router;
