/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("alert_receivers", (table) => {
		table.increments("id").primary();
		table.integer("id_receiver").unsigned().notNullable();
		table
			.foreign("id_receiver")
			.references("receivers.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table.integer("id_alert").unsigned();
		table
			.foreign("id_alert")
			.references("alerts.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
		table
			.timestamp("updated_at")
			.defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
		table.unique(["id"], "idx_id_alert_receiver");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("alert_receivers");
};
