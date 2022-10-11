const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
Model.knex(knex);

class Archive extends Model {
	static tableName = "archives";
}

module.exports = Archive;
