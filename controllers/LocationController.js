const Location = require("../models/Location")

class LocationController {
	async getAllLocations(req, res) {
		try {
			const location = await Location.query().select(
				"id",
				"name_location",
				"enabled",
				"delete",
				"url",
				"interval_location",
				"created_at"
			)
			res.status(200).json(location)
		} catch (error) {
			res.status(500).json(error)
		}
	}

	async getLocationsToSelect(req, res) {
		try {
			const location = await Location.query()
				.select("id", "name_location")
				.where("enabled", 1)
			res.status(200).json(location)
		} catch (error) {
			res.status(500).json(error)
		}
	}

	async storeLocation(req, res) {
		console.log(req.body)
		// const location = await Location.query()
		// 	.count("id")
		// 	.where("name_location", req.body.name);

		// if (location[0]["count(`id`)"] !== 0)
		// 	return res
		// 		.status(422)
		// 		.json({ message: "The given location already exists" });

		// const name_location = req.body.name;
		// const enabled = req.body.enabled;
		// const del = parseInt(req.body.del);
		// const url = req.body.url.replace(/\s/g, "");
		// const interval_location = parseInt(req.body.interval);

		// let newLocation;
		// try {
		// 	newLocation = await Location.query().insert({
		// 		name_location,
		// 		enabled,
		// 		delete: del,
		// 		url,
		// 		interval_location,
		// 	});
		// } catch (err) {
		// 	console.log(err.message);
		// 	return res.status(422).json({ message: err.message });
		// }

		// res.status(201).json(newLocation);
	}

	async updateLocation(req, res) {
		if (req.body["changedName"] === true) {
			const locationFind = await Location.query().where(
				"name_location",
				req.body.name
			)
			if (locationFind.length !== 0)
				return res
					.status(422)
					.json({ message: "The given location already exists" })
		}

		const id = req.body.id
		const name_location = req.body.name
		const enabled = req.body.enabled
		const del = parseInt(req.body.del)
		const url = req.body.url
		const interval_location = parseInt(req.body.interval)
		const location = await Location.query()
			.findById(id)
			.patch({ name_location, enabled, delete: del, url, interval_location })

		res.status(201).json(location)
	}

	async deleteLocation(req, res) {
		const id = req.params.id
		const location = await Location.query().deleteById(id)
		res.sendStatus(204)
	}
}

module.exports = new LocationController()
