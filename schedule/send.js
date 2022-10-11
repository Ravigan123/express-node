const cron = require("node-cron");
const Data = require("../models/Data");
const Location = require("../models/Location");
const Archive = require("../models/Archive");
const { transaction } = require("objection");
const axios = require("axios");

async function Send() {
	cron.schedule(`* * * * * *`, async function Checksend() {
		const dataQuery = await Data.query()
			.select(
				"locations.name_location",
				"locations.url",
				"locations.interval_location",
				"data.id",
				"data.in",
				"data.out",
				"data.date_real",
				"data.date_out",
				"data.id_location",
				"data.id_device",
				"data.interval",
				"data.created_at"
			)
			.innerJoin("locations", "locations.id", "data.id_location")
			.where("locations.enabled", 1);

		for (const data of dataQuery) {
			const d = new Date();
			if (d.getMinutes() % data["interval_location"] == 0) {
				const now = d.toLocaleString("se-SE", {
					timeZone: "Europe/Warsaw",
				});

				let part = "";
				part = data["url"].split(",");
				for (const url of part) {
					axios
						.get(url)
						.then(async (resp) => {
							await transaction(Archive, async (Archive, trx) => {
								const archiveStore = await trx("archives").insert({
									id_location: data["id_location"],
									id_device: data["id_device"],
									interval: data["interval"],
									in: data["in"],
									out: data["out"],
									date_real: data["date_real"],
									date_out: now,
								});

								const dataDel = await Data.query(trx).deleteById(data["id"]);

								return {
									archiveStore,
									dataDel,
								};
							});
						})
						.then("error", async (err) => {
							try {
								const id = data["id"];
								const dataError = await Data.query().findById(id).patch({
									date_out: now,
									description: err.message,
									status: 0,
								});
							} catch (error) {
								// return res.status(422).json({ message: error.message });
								console.log("Error: " + error.message);
							}
						});
				}
			}
		}
	});
}

module.exports = Send();
