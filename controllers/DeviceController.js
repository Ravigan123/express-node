const Device = require("../models/Device");

class DeviceController {
	async getAllDevices(req, res) {
		try {
			const device = await Device.query()
				.select(
					"locations.name_location",
					"types.name_type",
					"devices.id",
					"devices.id_location",
					"devices.id_type",
					"devices.name_device",
					"devices.enabled",
					"devices.params",
					"devices.details",
					"devices.interval_device",
					"devices.created_at"
				)
				.innerJoin("locations", "locations.id", "devices.id_location")
				.innerJoin("types", "types.id", "devices.id_type");
			res.status(200).json(device);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getDevicesToSelect(req, res) {
		try {
			const device = await Device.query().select("id", "name_device");
			res.status(200).json(device);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async storeDevice(req, res) {
		const devices = await Device.query()
			.count("id")
			.where("name_device", req.body.name);

		if (devices[0]["count(`id`)"] !== 0)
			return res
				.status(422)
				.json({ message: "The given device already exists" });

		const id_location = parseInt(req.body.location);
		const id_type = parseInt(req.body.type);
		const name_device = req.body.name;
		const enabled = req.body.enabled;
		const params = req.body.params;
		const details = req.body.details;
		const interval_device = parseInt(req.body.interval);

		let newDevice;
		try {
			newDevice = await Device.query().insert({
				id_location,
				id_type,
				name_device,
				enabled,
				params,
				details,
				interval_device,
			});
		} catch (err) {
			return res.status(422).json({ message: err.message });
		}

		res.status(201).json(newDevice);
	}

	async updateDevice(req, res) {
		if (req.body["changedName"] === true) {
			const deviceFind = await Device.query().where(
				"name_device",
				req.body.name
			);
			if (deviceFind.length !== 0)
				return res
					.status(422)
					.json({ message: "The given device already exists" });
		}

		const id = req.params.id;
		const id_location = parseInt(req.body.location);
		const id_type = parseInt(req.body.type);
		const name_device = req.body.name;
		const enabled = req.body.enabled;
		const params = req.body.params;
		const details = req.body.details;
		const interval_device = parseInt(req.body.interval);

		const device = await Device.query().findById(id).patch({
			id_location,
			id_type,
			name_device,
			enabled,
			params,
			details,
			interval_device,
		});

		res.status(201).json(device);
	}

	async deleteDevice(req, res) {
		const id = req.params.id;
		const device = await Device.query().deleteById(id);
		res.sendStatus(204);
	}
}

module.exports = new DeviceController();
