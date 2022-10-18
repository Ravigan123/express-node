const Transaction = require("../models/Transaction")

class TransactionController {
	async addTransaction(req, res) {
		// const transaction = await Transaction.query()
		// 	.select("name", "type", "sum", "date", "createdAt")
		// 	.innerJoin("users", "users.id", "transactions.id_user")
		// 	.where("id_user", req.body.name)

		// if (devices[0]["count(`id`)"] !== 0)
		// 	return res
		// 		.status(422)
		// 		.json({ message: "The given device already exists" })

		const id_user = parseInt(req.session.user)
		const id_category = parseInt(req.body.category)
		const name = req.body.name
		const type = parseInt(req.body.type)
		const sum = parseFloat(req.body.sum)
		const date = req.body.date

		let newTransaction
		try {
			newTransaction = await Transaction.query().insert({
				id_user,
				id_category,
				name,
				type,
				sum,
				date,
			})
		} catch (err) {
			return res.status(422).json({ message: err.message })
		}

		res.status(201).json(newTransaction)
	}

	async getAllTransaction(req, res) {
		const transactions = await Transaction.query()
			.select(
				"transactions.name_transaction",
				"categories.name_category",
				"type",
				"sum_transaction",
				"date",
				"transactions.created_at"
			)
			.innerJoin("categories", "categories.id", "transactions.id_category")
			.where("id_user", req.session.user)

		res.status(200).json(transactions)
	}

	async getLastMonthTransaction(req, res) {
		const date = new Date()
		const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
		const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
		const b = Date.parse("2019-01-01T00:00:00.000Z")
		const a = new Date(b)
		console.log(a)
		date.setHours(date.getHours() + 2)
		console.log(date.toString())

		firstDayOfMonth.setHours(firstDayOfMonth.getHours() + 2)
		lastDayOfMonth.setHours(lastDayOfMonth.getHours() + 2)
		console.log(firstDayOfMonth)
		console.log(lastDayOfMonth)
		const transactions = await Transaction.query()
			.select(
				"transactions.name_transaction",
				"categories.name_category",
				"type",
				"sum_transaction",
				"date",
				"transactions.created_at"
			)
			.innerJoin("categories", "categories.id", "transactions.id_category")
			.where("date", "<", lastDayOfMonth)
			.where("date", ">", firstDayOfMonth)
			.where("id_user", req.session.user)

		res.status(200).json(transactions)
	}

	async getOneTransaction(req, res) {
		const transaction = await Transaction.query()
			.select("name", "type", "sum", "date", "created_at")
			.where("id_user", req.session.user)
			.where("id", req.params["id"])

		res.status(200).json(transaction)
	}

	async updateTransaction(req, res) {
		const id = req.params.id
		const id_category = parseInt(req.body.category)
		const name = req.body.name
		const type = parseInt(req.body.type)
		const sum = parseFloat(req.body.sum)
		const date = req.body.date

		let transaction
		try {
			const transaction = await Transaction.query()
				.findById(id)
				.patch({ id_category, name, type, sum, date })
		} catch (err) {
			return res.status(422).json({ message: err.message })
		}

		res.status(201).json(transaction)
	}

	async deleteTransaction(req, res) {
		const id = req.params.id
		const transaction = await Transaction.query().deleteById(id)
		res.sendStatus(204)
	}
}

module.exports = new TransactionController()
