/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("categories", (table) => {
		table.increments("id").primary()
		table.string("name_category").notNullable()
		table.boolean("type").notNullable()
		table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"))
		table
			.timestamp("updated_at")
			.defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
		table.index(["id"], "idx_id_categories")
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("categories")
}
