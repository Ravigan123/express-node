const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
const User = require("./User");
Model.knex(knex);

class Course extends Model {
	static tableName = "courses";

	static relationMappings = {
		users: {
			relation: Model.ManyToManyRelation,
			modelClass: User,
			join: {
				from: "courses.id",
				through: {
					from: "course_users.id_course",
					to: "course_users.id_user",
				},
				to: "users.id",
			},
		},
	};
}

module.exports = Course;
