const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
Model.knex(knex);

class CourseUser extends Model {
	static tableName = "course_users";
}

module.exports = CourseUser;
