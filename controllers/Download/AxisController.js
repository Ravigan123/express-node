const Data = require("../models/Data");
const Location = require("../models/Location");
const Device = require("../models/Device");
const Archive = require("../models/Archive");
const DataController = require("../DataController");

class AxisController extends DataController {
	async getAllData(req, res) {
		try {
			const dataQuery = await Data.query()
				.select("id_device")
				.count("id_device", { as: "devices" })
				.groupBy("id_device");
			res.status(200).json(dataQuery);
		} catch (error) {
			res.status(500).json(error);
		}
	}
	async getData(req, res) {
		res.send("dziala12");
	}
	async translateData(req, res) {
		// tutaj if'y jaki typ urzadzenia
		this.
		const data = {
			interval: req.query.interval,
			in: req.query.in,
			out: req.query.out,
			location: req.query.location,
			device: req.query.device,
			date_real: req.query.date,
		};
		storeData(data, res);
	}

	async deleteData(req, res) {
		res.render("index");
	}
}

async function storeData(data, res) {
	const locationQuery = await Location.query().findOne({
		name_location: data.location,
	});

	const deviceQuery = await Device.query().findOne({
		name_device: data.device,
	});

	const interval = data.interval;
	const ins = data.in;
	const out = data.out;
	const status = 1;
	const location = locationQuery.id;
	const device = deviceQuery.id;
	const date_real = data.date_real;

	let newData;
	try {
		newData = await Data.query().insert({
			interval,
			in: ins,
			out,
			status,
			id_location: location,
			id_device: device,
			date_real,
		});
	} catch (err) {
		return res.status(422).json({ message: err.message });
	}

	res.status(201).json(newData);
}

module.exports = new AxisController();
