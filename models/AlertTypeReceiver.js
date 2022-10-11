const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
Model.knex(knex);

class AlertTypeReceiver extends Model {
	static tableName = "alert_type_receivers";
}

module.exports = AlertTypeReceiver;
