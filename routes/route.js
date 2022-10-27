const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const TransactionController = require("../controllers/TransactionController");
const SaveGoalController = require("../controllers/SaveGoalController");
const CourseController = require("../controllers/CourseController");

//user

router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.post("/register", UserController.registerUser);
router.get("/confirm/:id:token", UserController.confirmUser);
router.post("/forgot-password", UserController.sendForgotPassword);
router.put("/reset-password/:id:token", UserController.changeForgotPassword);
router.put("/change-password", UserController.changePassword);
router.delete("/user", UserController.deleteUser);
//opcjonalne
// router.put("/role/:id", UserController.changeRole);
// router.put("/active/:id", UserController.changeActive);
// router.put("/change-email/:id", UserController.changeEmail);

//transaction
router.post("/transaction", TransactionController.addTransaction);
router.get("/transaction", TransactionController.getAllTransaction);
router.get("/transaction/:id", TransactionController.getOneTransaction);
router.put("/transaction/:id", TransactionController.updateTransaction);
router.delete("/transaction/:id", TransactionController.deleteTransaction);

//save goal

router.post("/save-goal", SaveGoalController.addSaveGoal);
router.get("/save-goal", SaveGoalController.getAllSaveGoal);
router.get("/save-goal/:id", SaveGoalController.getOneSaveGoal);
router.put("/save-goal/:id", SaveGoalController.updateSaveGoal);
router.delete("/save-goal/:id", SaveGoalController.deleteSaveGoal);

//kursy walut

router.post("/course", CourseController.addCourse);
router.get("/course", CourseController.getCourse);
// router.get("/kurs/:id", CourseController.getCourse);
router.delete("/course/:id", CourseController.deleteCourse);

module.exports = router;
