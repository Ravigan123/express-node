const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const TransactionController = require("../controllers/TransactionController");
const SaveGoalController = require("../controllers/SaveGoalController");
const CourseController = require("../controllers/CourseController");

//user

router.post("/logowanie", UserController.login);
router.get("/wylogowanie", UserController.logout);
router.post("/rejestracja", UserController.registerUser);
router.get("/potwierdz/:id:token", UserController.confirmUser);
router.post("/zapomnialem-hasla", UserController.sendForgotPassword);
router.put("/resetu-haslo/:id:token", UserController.changeForgotPassword);
router.put("/zmien-haslo/:id", UserController.changePassword);
router.delete("/uzytkownik/:id", UserController.deleteUser);
//opcjonalne
// router.put("/role/:id", UserController.changeRole);
// router.put("/active/:id", UserController.changeActive);
// router.put("/change-email/:id", UserController.changeEmail);

//transaction
router.post("/transakcja", TransactionController.addTransaction);
router.get("/transakcja", TransactionController.getAllTransaction);
router.get("/transakcja/:id", TransactionController.getOneTransaction);
router.put("/transakcja/:id", TransactionController.updateTransaction);
router.delete("/transakcja/:id", TransactionController.deleteTransaction);

//save goal

router.post("/cel-oszczednosci", SaveGoalController.addSaveGoal);
router.get("/cel-oszczednosci", SaveGoalController.getAllSaveGoal);
router.get("/cel-oszczednosci/:id", SaveGoalController.getOneSaveGoal);
router.put("/cel-oszczednosci/:id", SaveGoalController.updateSaveGoal);
router.delete("/cel-oszczednosci/:id", SaveGoalController.deleteSaveGoal);

//kursy walut

router.post("/kurs", CourseController.addCourse);
router.get("/kurs", CourseController.getCourse);
// router.get("/kurs/:id", CourseController.getCourse);
router.delete("/kurs/:id", CourseController.deleteCourse);

module.exports = router;
