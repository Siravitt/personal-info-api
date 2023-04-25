const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");

router.get("/", userController.getUser);
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.get("/information", userController.getInformation);
router.post("/information", userController.addInformation);

module.exports = router;
