/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("courses", (table) => {
		table.increments("id").primary()
		table.string("name_course", 40).notNullable()
		table.string("code", 5).notNullable()
		table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"))
		table
			.timestamp("updated_at")
			.defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
		table.index(["id"], "idx_id_courses")
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("courses")
}
