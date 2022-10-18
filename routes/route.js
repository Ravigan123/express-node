const express = require("express")
const router = express.Router()
const auth = require("../auth")
const isLogged = require("../isLogged")

const UserController = require("../controllers/UserController")
const TransactionController = require("../controllers/TransactionController")
const SaveGoalController = require("../controllers/SaveGoalController")
const CourseController = require("../controllers/CourseController")

//user
router.get("/", auth, UserController.test)

router.post("/logowanie", isLogged, UserController.login)
router.get("/wylogowanie", UserController.logout)
router.post("/rejestracja", isLogged, UserController.registerUser)
router.get("/potwierdz/:id:token", isLogged, UserController.confirmUser)
router.post("/zapomnialem-hasla", isLogged, UserController.sendForgotPassword)
router.put(
	"/resetuj-haslo/:id:token",
	isLogged,
	UserController.changeForgotPassword
)
router.put("/zmien-haslo/:id", UserController.changePassword)
router.delete("/uzytkownik/:id", UserController.deleteUser)
//opcjonalne
// router.put("/role/:id", UserController.changeRole);
// router.put("/active/:id", UserController.changeActive);
// router.put("/change-email/:id", UserController.changeEmail);

//transaction
router.post("/transakcja", auth, TransactionController.addTransaction)
router.get("/transakcjaOMiesiac", auth, TransactionController.getLastMonthTransaction)
router.get("/transakcja", auth, TransactionController.getAllTransaction)
router.get("/transakcja/:id", auth, TransactionController.getOneTransaction)
router.put("/transakcja/:id", auth, TransactionController.updateTransaction)
router.delete("/transakcja/:id", auth, TransactionController.deleteTransaction)

//save goal

router.post("/cel-oszczednosci", SaveGoalController.addSaveGoal)
router.get("/cel-oszczednosci", SaveGoalController.getAllSaveGoal)
router.get("/cel-oszczednosci/:id", SaveGoalController.getOneSaveGoal)
router.put("/cel-oszczednosci/:id", SaveGoalController.updateSaveGoal)
router.delete("/cel-oszczednosci/:id", SaveGoalController.deleteSaveGoal)

//kursy walut

router.post("/kursy", CourseController.addCourse)
router.get("/kursy", CourseController.getCourse)
// router.get("/kursy/:id", CourseController.getCourse);
router.put("/kursy/:id", CourseController.updateCourse)
router.delete("/kursy/:id", CourseController.deleteCourse)

module.exports = router
