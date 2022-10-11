const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
Model.knex(knex);

class AlertReceiver extends Model {
	static tableName = "alert_receivers";
}

module.exports = AlertReceiver;
