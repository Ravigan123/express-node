const cron = require("node-cron");
const Archive = require("../models/Archive");
const Location = require("../models/Location");

function delArchive() {
	cron.schedule(`* * * * *`, async function del() {
		const archives = await Archive.query().select(
			"id",
			"created_at",
			"id_location"
		);
		for (const archive of archives) {
			const idLoc = archive["id_location"];
			const locationQuery = await Location.query()
				.select("delete")
				.where("enabled", 1)
				.where("id", idLoc);

			const delTime = locationQuery[0]["delete"];
			let date = new Date();
			date.setDate(date.getDate() - delTime);
			if (date > archive["created_at"]) {
				const id = archive["id"];
				const deleteArchive = await Archive.query().deleteById(id);
			}
		}
	});
}

module.exports = delArchive();
