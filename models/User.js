const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
const Transaction = require("./Transaction");
const Course = require("./Course");
const SaveGoal = require("./SaveGoal");
Model.knex(knex);

class User extends Model {
	static tableName = "users";

	static relationMappings = {
		transaction: {
			relation: Model.HasManyRelation,
			modelClass: Transaction,
			join: {
				from: "users.id",
				to: "transactions.id_user",
			},
		},
	};

	static relationMappings = {
		saveGoal: {
			relation: Model.HasManyRelation,
			modelClass: SaveGoal,
			join: {
				from: "users.id",
				to: "save_goals.id_user",
			},
		},
	};

	static relationMappings = {
		courses: {
			relation: Model.ManyToManyRelation,
			modelClass: Course,
			join: {
				from: "users.id",
				through: {
					from: "course_users.id_user",
					to: "course_users.id_course",
				},
				to: "courses.id",
			},
		},
	};
}

module.exports = User;
