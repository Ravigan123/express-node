const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
Model.knex(knex);

class Data extends Model {
	static tableName = "data";
}

module.exports = Data;
