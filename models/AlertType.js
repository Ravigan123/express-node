const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
const Alert = require("./Alert");
const Receiver = require("./Receiver");
Model.knex(knex);

class AlertType extends Model {
	static tableName = "alert_types";

	static relationMappings = {
		alerts: {
			relation: Model.HasManyRelation,
			modelClass: Alert,
			join: {
				from: "alert_types.id",
				to: "alerts.id_type",
			},
		},
	};

	static relationMappings = {
		receivers: {
			relation: Model.ManyToManyRelation,
			modelClass: Receiver,
			join: {
				from: "alert_types.id",
				through: {
					from: "alert_type_receivers.id_alert_type",
					to: "alert_type_receivers.id_receiver",
				},
				to: "receivers.id",
			},
		},
	};
}

module.exports = AlertType;
