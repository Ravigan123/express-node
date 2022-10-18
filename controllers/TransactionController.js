const Transaction = require("../models/Transaction");

class TransactionController {
	async addTransaction(req, res) {}
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
	async getOneTransaction(req, res) {}
	async updateTransaction(req, res) {}
	async deleteTransaction(req, res) {}
}

module.exports = new TransactionController();
