const router = require("express").Router();
const { registerUser, loginUser, findUser, getUser } = require("../Controller/userController");
const User = require("../Models/userModel");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUser);
module.exports = router;
