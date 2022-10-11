const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
const Alert = require("./Alert");
const AlertType = require("./AlertType");
Model.knex(knex);

class Receiver extends Model {
	static tableName = "receivers";

	static relationMappings = {
		alerts: {
			relation: Model.ManyToManyRelation,
			modelClass: Alert,
			join: {
				from: "receivers.id",
				through: {
					from: "alert_receivers.id_receiver",
					to: "alert_receivers.id_alert",
				},
				to: "alerts.id",
			},
		},
	};

	static relationMappings = {
		alert_types: {
			relation: Model.ManyToManyRelation,
			modelClass: AlertType,
			join: {
				from: "receivers.id",
				through: {
					from: "alert_type_receivers.id_receiver",
					to: "alert_type_receivers.id_alert_type",
				},
				to: "alert_types.id",
			},
		},
	};
}

module.exports = Receiver;
