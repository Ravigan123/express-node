/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("course_users", (table) => {
		table.increments("id").primary()
		table.integer("id_user").unsigned().notNullable()
		table
			.foreign("id_user")
			.references("users.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE")
		table.integer("id_course").unsigned().notNullable()
		table
			.foreign("id_course")
			.references("courses.id")
			.onUpdate("CASCADE")
			.onDelete("CASCADE")
		table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"))
		table
			.timestamp("updated_at")
			.defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
		table.index(["id"], "idx_id_course_users")
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("course_users")
}
