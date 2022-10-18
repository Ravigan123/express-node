const SaveGoal = require("../models/SaveGoal");

class SaveGoalController {
	async addSaveGoal(req, res) {
		let newGoal;

		// const id_user = parseInt(req.session.user);
		const id_user = 1;
		const name_goal = req.body.name;
		const sum_goal = parseFloat(req.body.sum);
		const save_sum = parseFloat(req.body.save_sum);
		const date_end = req.body.date;

		try {
			newGoal = await SaveGoal.query().insert({
				id_user,
				name_goal,
				sum_goal,
				save_sum,
				date_end,
			});
		} catch (err) {
			return res.status(422).json({ message: err.message });
		}
		res.status(200).json(newGoal);
	}
	async getAllSaveGoal(req, res) {
		const SaveGoals = await SaveGoal.query()
			.select("name_goal", "sum_goal", "save_sum", "date_end", "created_at")
			.where("id_user", 1);

		res.status(200).json(SaveGoals);
	}
	async getOneSaveGoal(req, res) {
		const SaveGoalOne = await SaveGoal.query()
			.select("name_goal", "sum_goal", "save_sum", "date_end", "created_at")
			.where("id_user", id_user)
			.where("id", req.params.id);

		res.status(200).json(SaveGoalOne);
	}
	async updateSaveGoal(req, res) {
		let updateGoal;

		// const id_user = parseInt(req.session.user);
		const id_user = 1;
		const name_goal = req.body.name;
		const sum_goal = parseFloat(req.body.sum);
		const save_sum = parseFloat(req.body.save_sum);
		const date_end = req.body.date;

		try {
			updateGoal = await SaveGoal.query()
				.patch({
					id_user,
					name_goal,
					sum_goal,
					save_sum,
					date_end,
				})
				.where("id_user", id_user)
				.where("id", req.params.id);
		} catch (err) {
			return res.status(422).json({ message: err.message });
		}
		res.status(201).json(updateGoal);
	}
	async deleteSaveGoal(req, res) {
		const SaveGoalDelete = await SaveGoal.query()
			.delete()
			.where("id_user", 1)
			.where("id", req.params.id);

		res.status(200).json(SaveGoalDelete);
	}
}

module.exports = new SaveGoalController();
