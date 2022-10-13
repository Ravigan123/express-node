const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
Model.knex(knex);

class User extends Model {
	static tableName = "users";
}

module.exports = User;
