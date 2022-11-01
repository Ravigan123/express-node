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

router.post("/login", isLogged, UserController.login)
router.get("/logout", UserController.logout)
router.post("/register", isLogged, UserController.registerUser)
router.get("/confirm/:id:token", isLogged, UserController.confirmUser)
router.post("/forgot-password", isLogged, UserController.sendForgotPassword)
router.put(
	"/reset-password/:id:token",
	isLogged,
	UserController.changeForgotPassword
)
router.put("/change-password", UserController.changePassword)
router.delete("/user", UserController.deleteUser)
//opcjonalne
// router.put("/role/:id", UserController.changeRole);
// router.put("/active/:id", UserController.changeActive);
// router.put("/change-email/:id", UserController.changeEmail);

//transaction
router.post("/transakcja", auth, TransactionController.addTransaction)
// router.get(
// 	"/transakcjaOMiesiac",
// 	auth,
// 	TransactionController.getLastMonthTransaction
// )
router.get("/transaction", auth, TransactionController.getAllTransaction)
router.get("/transaction/:id", auth, TransactionController.getOneTransaction)
router.put("/transaction/:id", auth, TransactionController.updateTransaction)
router.delete("/transaction/:id", auth, TransactionController.deleteTransaction)

//save goal

router.post("/save-goal", auth, SaveGoalController.addSaveGoal)
router.get("/save-goal", auth, SaveGoalController.getAllSaveGoal)
router.get("/save-goal/:id", SaveGoalController.getOneSaveGoal)
router.put("/save-goal/:id", auth, SaveGoalController.updateSaveGoal)
router.delete("/save-goal/:id", auth, SaveGoalController.deleteSaveGoal)

//kursy walut

router.post("/course", auth, CourseController.addCourse)
router.get("/course", auth, CourseController.getCourse)
// router.get("/kursy/:id", CourseController.getCourse);
// router.put("/kursy/:id", CourseController.updateCourse)
router.delete("/course/:id", auth, CourseController.deleteCourse)

module.exports = router
