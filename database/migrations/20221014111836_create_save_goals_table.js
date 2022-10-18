/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("save_goals", (table) => {
		table.increments("id").primary();
		table.integer("id_user").unsigned().notNullable();
		table
			.foreign("id_user")
			.references("users.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table.string("name_goal").notNullable();
		table.decimal("sum_goal").notNullable();
		table.decimal("sum_save").notNullable();
		table.date("date_end").notNullable();
		table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
		table
			.timestamp("updated_at")
			.defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
		table.unique(["id"], "idx_id_save_goal");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("save_goals");
};
