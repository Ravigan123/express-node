/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("alerts", (table) => {
		table.increments("id").primary();
		table.integer("id_type").unsigned().notNullable();
		table
			.foreign("id_type")
			.references("alert_types.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table.integer("id_location").unsigned();
		table
			.foreign("id_location")
			.references("locations.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table.integer("id_device").unsigned();
		table
			.foreign("id_device")
			.references("devices.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE");
		table.string("message").notNullable();
		table.integer("status_alert").notNullable();
		table.integer("count").notNullable();
		table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
		table
			.timestamp("updated_at")
			.defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
		table.unique(["id"], "idx_id_alert");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("alerts");
};
