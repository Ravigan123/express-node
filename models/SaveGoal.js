const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
Model.knex(knex);

class SaveGoal extends Model {
	static tableName = "save_goals";
}

module.exports = SaveGoal;
