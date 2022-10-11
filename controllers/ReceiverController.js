const Receiver = require("../models/Receiver");
const AlertTypeReceiver = require("../models/AlertTypeReceiver");
const AlertType = require("../models/AlertType");

class ReceiverController {
	async getAllReceivers(req, res) {
		try {
			const receivers = await Receiver.query()
				.select(
					"receivers.id",
					"receivers.name_receiver",
					"receivers.type_receiver",
					"receivers.address",
					"receivers.addition"
				)
				.orderBy("receivers.name_receiver");

			res.status(200).json(receivers);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async storeReceiver(req, res) {
		const receiver = await Receiver.query().where(
			"name_receiver",
			req.body.nameReceiver
		);
		if (receiver.length !== 0)
			return res
				.status(422)
				.json({ message: "The given receiver already exists" });

		const name_receiver = req.body.nameReceiver;
		const type_receiver = req.body.type;
		const address = req.body.address;
		const addition = req.body.addition;

		let newReceiver;
		try {
			newReceiver = await Receiver.query().insert({
				name_receiver,
				type_receiver,
				address,
				addition,
			});
		} catch (err) {
			return res.status(422).json({ message: err.message });
		}

		res.status(201).json(newReceiver);
	}

	async updateReceiver(req, res) {
		if (req.body["changedName"] === true) {
			const receiverFind = await Receiver.query().where(
				"name_receiver",
				req.body.name
			);
			if (receiverFind.length !== 0)
				return res
					.status(422)
					.json({ message: "The given receiver already exists" });
		}
		const id = req.body.id;
		const name_receiver = req.body.name;
		const type_receiver = req.body.type;
		const address = req.body.address;
		const addition = req.body.addition;
		const receiver = await Receiver.query()
			.findById(id)
			.patch({ name_receiver, type_receiver, address, addition });
		res.status(201).json(receiver);
	}

	async deleteReceiver(req, res) {
		const id = req.params.id;
		const receiver = await Receiver.query().deleteById(id);
		res.sendStatus(204);
	}

	async getReceiverDetails(req, res) {
		const receivers = await Receiver.query()
			.select(
				"alert_type_receivers.id",
				"locations.name_location",
				"alert_type_receivers.id_alert_type",
				"alert_types.name_alert",
				"alert_type_receivers.interval_receiver"
			)
			.leftJoin(
				"alert_type_receivers",
				"receivers.id",
				"alert_type_receivers.id_receiver"
			)
			.leftJoin(
				"alert_types",
				"alert_type_receivers.id_alert_type",
				"alert_types.id"
			)
			.leftJoin("locations", "alert_type_receivers.id_location", "locations.id")
			.where("alert_type_receivers.id_receiver", req.params.id);
		res.status(200).json(receivers);
	}

	async storeReceiverDetails(req, res) {
		const id_receiver = req.body.receiver;
		let id_location;
		let id_alert_type;
		let interval_receiver;

		if (req.body.location === "null" || req.body.location === "")
			id_location = null;
		else id_location = parseInt(req.body.location);

		if (req.body.nameAlert === "null" || req.body.nameAlert === "")
			id_alert_type = null;
		else id_alert_type = parseInt(req.body.nameAlert);

		if (id_location === null && id_alert_type === null)
			return res
				.status(422)
				.json({ message: "both values cannot be null (Location, Type alert)" });

		if (req.body.interval === "") {
			if (id_alert_type === null)
				interval_receiver = parseInt(req.body.interval);
			else {
				const intervalType = await AlertType.query()
					.select("id", "interval_alert")
					.where("id", id_alert_type);
				interval_receiver = intervalType[0]["interval_alert"];
			}
		} else interval_receiver = parseInt(req.body.interval);

		let newDetails;
		try {
			newDetails = await AlertTypeReceiver.query().insert({
				id_receiver,
				id_location,
				id_alert_type,
				interval_receiver,
			});
		} catch (err) {
			return res.status(422).json({ message: err.message });
		}

		res.status(201).json(newDetails);
	}

	async deleteReceiverDetails(req, res) {
		const id = req.params.id;
		const receiverDetails = await AlertTypeReceiver.query().deleteById(id);
		res.sendStatus(204);
	}
}

module.exports = new ReceiverController();
