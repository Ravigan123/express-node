const Transaction = require("../models/Transaction");

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

		const id_user = parseInt(req.session.user);
		const id_category = parseInt(req.body.category);
		const name = req.body.name;
		const type = parseInt(req.body.type);
		const sum = parseFloat(req.body.sum);
		const date = req.body.date;

		let newTransaction;
		try {
			newTransaction = await Transaction.query().insert({
				id_user,
				id_category,
				name,
				type,
				sum,
				date,
			});
		} catch (err) {
			return res.status(422).json({ message: err.message });
		}

		res.status(201).json(newTransaction);
	}

	async getAllTransaction(req, res) {
		const d = new Date();
		const lastMonthFirstDay = new Date(d.getFullYear(), d.getMonth() - 1, 1);
		const thisMonthFirstDay = new Date(d.getFullYear(), d.getMonth(), 1);

		const course = await Transaction.query()
			.select("id", "name_transaction", "date")
			.where("id_user", 1)
			.where("date", ">=", lastMonthFirstDay)
			.where("date", "<", thisMonthFirstDay);

		res.status(200).json(course);
		// const d1 = new Date(year, monthIndex [, day [, hours [, minutes [, seconds [,
		// milliseconds]]]]]);
		// const d2 =new Date(value);
		// const d3 = new Date(dateString);
	}

	async getOneTransaction(req, res) {
		const transaction = await Transaction.query()
			.select("name", "type", "sum", "date", "created_at")
			.where("id_user", req.session.user)
			.where("id", req.params["id"]);

		res.status(200).json(transaction);
	}

	async updateTransaction(req, res) {
		const id = req.params.id;
		const id_category = parseInt(req.body.category);
		const name = req.body.name;
		const type = parseInt(req.body.type);
		const sum = parseFloat(req.body.sum);
		const date = req.body.date;

		let transaction;
		try {
			const transaction = await Transaction.query()
				.findById(id)
				.patch({ id_category, name, type, sum, date });
		} catch (err) {
			return res.status(422).json({ message: err.message });
		}

		res.status(201).json(transaction);
	}

	async deleteTransaction(req, res) {
		const id = req.params.id;
		const transaction = await Transaction.query().deleteById(id);
		res.sendStatus(204);
	}
}

module.exports = new TransactionController();
