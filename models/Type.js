const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
const Device = require("../models/Device");
Model.knex(knex);

class Type extends Model {
	static tableName = "types";

	static relationMappings = {
		device: {
			relation: Model.HasManyRelation,
			modelClass: Device,
			join: {
				from: "devices.id",
				to: "types.id_location",
			},
		},
	};
}

module.exports = Type;
