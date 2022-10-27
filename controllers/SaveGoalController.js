const SaveGoal = require("../models/SaveGoal");

class SaveGoalController {
	async addSaveGoal(req, res) {
		const id_user = parseInt(req.session.user);
		const name_goal = req.body.name;
		const sum_goal = parseFloat(req.body.sum);
		if (sum_goal.toString() == "NaN")
			return res.status(422).json({ message: "Podaj poprawą wartość" });

		const sum_save = parseFloat(req.body.sum_save);
		if (sum_save.toString() == "NaN")
			return res.status(422).json({ message: "Podaj poprawą wartość" });

		const date_end = req.body.date;
		const unixTimeZero = Date.parse(date_end);
		const d = new Date(unixTimeZero);

		function dateIsValid(date) {
			return date instanceof Date && !isNaN(date);
		}

		if (!dateIsValid(d))
			return res.status(422).json({ message: "Podaj poprawną datę" });

		let newGoal;
		try {
			newGoal = await SaveGoal.query().insert({
				id_user,
				name_goal,
				sum_goal,
				sum_save,
				date_end,
			});
		} catch (err) {
			return res.status(500).json({ message: "No connection" });
		}
		res.status(200).json(newGoal);
	}

	async getAllSaveGoal(req, res) {
		try {
			const SaveGoals = await SaveGoal.query()
				.select("name_goal", "sum_goal", "save_sum", "date_end", "created_at")
				.where("id_user", 1);
		} catch (error) {
			return res.status(500).json({ message: "No connection" });
		}

		res.status(200).json(SaveGoals);
	}

	async getOneSaveGoal(req, res) {
		try {
			const SaveGoalOne = await SaveGoal.query()
				.select("name_goal", "sum_goal", "save_sum", "date_end", "created_at")
				.where("id_user", id_user)
				.where("id", req.params.id);
		} catch (error) {
			return res.status(500).json({ message: "No connection" });
		}

		res.status(200).json(SaveGoalOne);
	}

	async updateSaveGoal(req, res) {
		// const id_user = parseInt(req.session.user);
		let saveGoal;
		try {
			saveGoal = await SaveGoal.query().findOne({
				id_user: 3,
				id: req.params["id"],
			});
		} catch (error) {
			return res.status(500).json({ message: "No connection" });
		}

		if (saveGoal === undefined)
			return res.status(401).json({ message: "Błąd podczas aktualizacji" });

		const id_user = 3;
		const name_goal = req.body.name;
		const sum_goal = parseFloat(req.body.sum);
		if (sum_goal.toString() == "NaN")
			return res.status(422).json({ message: "Wartość nie jest liczbą" });

		const sum_save = parseFloat(req.body.sum_save);
		if (sum_save.toString() == "NaN")
			return res.status(422).json({ message: "Wartość nie jest liczbą" });

		const date_end = req.body.date;
		const unixTimeZero = Date.parse(date_end);
		const d = new Date(unixTimeZero);

		function dateIsValid(date) {
			return date instanceof Date && !isNaN(date);
		}

		if (!dateIsValid(d))
			return res.status(422).json({ message: "Podaj poprawną datę" });

		let updatedGoal;
		try {
			updatedGoal = await SaveGoal.query()
				.patch({
					id_user,
					name_goal,
					sum_goal,
					sum_save,
					date_end,
				})
				.where("id_user", id_user)
				.where("id", req.params.id);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
		res.status(201).json(updatedGoal);
	}

	async deleteSaveGoal(req, res) {
		const id = req.params.id;
		try {
			const SaveGoalDelete = await SaveGoal.query()
				.delete(id)
				.where("id_user", 3);
		} catch (error) {
			return res.status(500).json({ message: err.message });
		}

		res.status(200).json(SaveGoalDelete);
	}
}

module.exports = new SaveGoalController();
