const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/authenticateUser");
const userController = require("../controllers/user-controller");

router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.get("/information", authenticateUser, userController.getInformation);
router.post("/information", authenticateUser, userController.addInformation);

module.exports = router;
