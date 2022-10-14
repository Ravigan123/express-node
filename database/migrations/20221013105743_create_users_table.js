/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("users", (table) => {
		table.increments("id").primary();
		table.string("email").notNullable();
		table.string("password").notNullable();
		table.boolean("isActive").notNullable();
		table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
		table
			.timestamp("updated_at")
			.defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
		table.unique(["id"], "idx_id_users");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("users");
};
