const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
const Data = require("./Data");
const Archive = require("./Archive");
Model.knex(knex);

class Device extends Model {
	static tableName = "devices";

	static relationMappings = {
		data: {
			relation: Model.HasManyRelation,
			modelClass: Data,
			join: {
				from: "devices.id",
				to: "data.id_device",
			},
		},
	};

	static relationMappings = {
		archive: {
			relation: Model.HasManyRelation,
			modelClass: Archive,
			join: {
				from: "devices.id",
				to: "archives.id_device",
			},
		},
	};
}

module.exports = Device;
