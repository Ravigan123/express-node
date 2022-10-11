const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
const Receiver = require("./Receiver");
Model.knex(knex);

class Alert extends Model {
	static tableName = "alerts";

	static relationMappings = {
		receivers: {
			relation: Model.ManyToManyRelation,
			modelClass: Receiver,
			join: {
				from: "alerts.id",
				through: {
					// persons_movies is the join table.
					from: "alert_receivers.alert_id",
					to: "alert_receivers.receiver_id",
				},
				to: "receivers.id",
			},
		},
	};
}

module.exports = Alert;
