const { Model } = require("objection");
require("objection");
const knex = require("../config/database");
const Transaction = require("./Transaction");
Model.knex(knex);

class Category extends Model {
	static tableName = "categories";

	static relationMappings = {
		transaction: {
			relation: Model.HasManyRelation,
			modelClass: Transaction,
			join: {
				from: "categories.id",
				to: "transactions.id_category",
			},
		},
	};
}

module.exports = Category;
