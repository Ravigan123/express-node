const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.post("/register", UserController.registerUser);
router.get("/confirm/:id:token", UserController.confirmUser);
router.post("/forgot-password", UserController.sendForgotPassword);
router.post("/reset-password/:id:token", UserController.changeForgotPassword);
// router.put("/location/:id", LocationController.updateLocation);
// router.delete("/location/:id", LocationController.deleteLocation);

module.exports = router;
