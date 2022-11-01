const SaveGoal = require("../models/SaveGoal")
const Transaction = require("../models/Transaction")

class SaveGoalController {
	async addSaveGoal(req, res) {
		const id_user = parseInt(req.session.user)
		const name_goal = req.body.name
		const sum_goal = parseFloat(req.body.sum)
		if (sum_goal.toString() == "NaN")
			return res.status(422).json({ message: "Podaj poprawą wartość" })

		const date_end = req.body.date
		const unixTimeZero = Date.parse(date_end)
		const d = new Date(unixTimeZero)

		function dateIsValid(date) {
			return date instanceof Date && !isNaN(date)
		}

		if (!dateIsValid(d))
			return res.status(422).json({ message: "Podaj poprawną datę" })

		let newGoal
		try {
			newGoal = await SaveGoal.query().insert({
				id_user,
				name_goal,
				sum_goal,
				date_end,
			})
		} catch (err) {
			return res.status(500).json({ message: "No connection" })
		}
		res.status(200).json(newGoal)
	}
	s
	async getAllSaveGoal(req, res) {
		try {
			const SaveGoals = await SaveGoal.query()
				.select("name_goal", "sum_goal", "save_sum", "date_end", "created_at")
				.where("id_user", 1)
		} catch (error) {
			return res.status(500).json({ message: "No connection" })
		}

		res.status(200).json(SaveGoals)
	}

	async getOneSaveGoal(req, res) {
		try {
			const SaveGoalOne = await SaveGoal.query()
				.select("name_goal", "sum_goal", "date_end", "created_at")
				.where("id_user", 1)
				.where("id", req.params.id)

			const startDate = SaveGoalOne[0]["created_at"]
			const endDate = SaveGoalOne[0]["date_end"]

			const diffMonths =
				endDate.getMonth() -
				startDate.getMonth() +
				12 * (endDate.getFullYear() - startDate.getFullYear())

			const d = new Date()

			const beginDate = SaveGoalOne[0]["created_at"]
			const firstMonth = new Date(
				beginDate.getFullYear(),
				beginDate.getMonth(),
				1
			)
			const thisMonthFirstDay = new Date(d.getFullYear(), d.getMonth(), 1)
			const nextMonthFirstDay = new Date(d.getFullYear(), d.getMonth() + 1, 1)

			const diffPreviousMonths =
				thisMonthFirstDay.getMonth() -
				firstMonth.getMonth() +
				12 * (thisMonthFirstDay.getFullYear() - firstMonth.getFullYear())

			const expensesBeforeMonth = await Transaction.query()
				.select("categories.type")
				.sum("sum_transaction as sum")
				.innerJoin("categories", "categories.id", "transactions.id_category")
				.where("id_user", 1)
				.where("date", ">=", firstMonth)
				.where("date", "<", thisMonthFirstDay)
				.groupBy("categories.type")

			//front
			// const saldoPreviousMonths =
			// 	expensesBeforeMonth[1]["sum"] - expensesBeforeMonth[0]["sum"]

			const expensesThisMonth = await Transaction.query()
				.select("categories.type")
				.sum("sum_transaction as sum")
				.innerJoin("categories", "categories.id", "transactions.id_category")
				.where("id_user", 1)
				.where("date", ">=", thisMonthFirstDay)
				.where("date", "<", nextMonthFirstDay)
				.groupBy("categories.type")

			//front
			// const saldoThisMonth = expenses[1]["sum"] - expenses[0]["sum"]

			res.status(200).json({
				expensesBeforeMonth,
				expensesThisMonth,
				diffMonths,
				diffPreviousMonths,
			})
		} catch (error) {
			return res.status(422).json({ message: error.message })
		}
	}

	async updateSaveGoal(req, res) {
		// const id_user = parseInt(req.session.user);
		let saveGoal
		try {
			saveGoal = await SaveGoal.query().findOne({
				id_user: 3,
				id: req.params["id"],
			})
		} catch (error) {
			return res.status(500).json({ message: "No connection" })
		}

		if (saveGoal === undefined)
			return res.status(401).json({ message: "Błąd podczas aktualizacji" })

		const id_user = 3
		const name_goal = req.body.name
		const sum_goal = parseFloat(req.body.sum)
		if (sum_goal.toString() == "NaN")
			return res.status(422).json({ message: "Wartość nie jest liczbą" })

		const date_end = req.body.date
		const unixTimeZero = Date.parse(date_end)
		const d = new Date(unixTimeZero)

		function dateIsValid(date) {
			return date instanceof Date && !isNaN(date)
		}

		if (!dateIsValid(d))
			return res.status(422).json({ message: "Podaj poprawną datę" })

		let updatedGoal
		try {
			updatedGoal = await SaveGoal.query()
				.patch({
					id_user,
					name_goal,
					sum_goal,
					date_end,
				})
				.where("id_user", id_user)
				.where("id", req.params.id)
		} catch (err) {
			return res.status(500).json({ message: err.message })
		}
		res.status(201).json(updatedGoal)
	}

	async deleteSaveGoal(req, res) {
		const id = req.params.id
		try {
			const SaveGoalDelete = await SaveGoal.query()
				.delete(id)
				.where("id_user", 3)
		} catch (error) {
			return res.status(500).json({ message: err.message })
		}

		res.status(200).json(SaveGoalDelete)
	}
}

module.exports = new SaveGoalController()
