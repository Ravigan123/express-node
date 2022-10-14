const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
Model.knex(knex);

class Transaction extends Model {
	static tableName = "transactions";
}

module.exports = Transaction;
