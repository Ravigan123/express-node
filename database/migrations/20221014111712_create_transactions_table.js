/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("transactions", (table) => {
		table.increments("id").primary();
		table.integer("id_user").unsigned().notNullable();
		table
			.foreign("id_user")
			.references("users.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table.integer("id_category").unsigned();
		table
			.foreign("id_category")
			.references("categories.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table.string("name").notNullable();
		table.boolean("type").notNullable();
		table.decimal("sum").notNullable();
		table.date("date").notNullable();
		table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
		table
			.timestamp("updated_at")
			.defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
		table.unique(["id"], "idx_id_transaction");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("transactions");
};
