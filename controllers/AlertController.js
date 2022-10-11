const Alert = require("../models/Alert");
const AlertType = require("../models/AlertType");

class AlertController {
	async getAllAlerts(req, res) {
		try {
			const alerts = await Alert.query()
				.select(
					"alerts.id",
					"alerts.message",
					"alerts.count",
					"alerts.status_alert",
					"alerts.created_at",
					"alert_types.name_alert",
					"receivers.name_receiver",
					"locations.name_location",
					"devices.name_device"
				)
				.innerJoin("alert_types", "alerts.id_type", "alert_types.id")
				.innerJoin(
					"alert_receivers",
					"alert_receivers.id_alert",
					"alert_types.id"
				)
				.innerJoin("receivers", "alert_receivers.id_receiver", "receivers.id")
				.innerJoin("locations", "alerts.id_location", "locations.id")
				.innerJoin("devices", "alerts.id_device", "devices.id")
				.whereIn("alerts.status_alert", [0, 1]);

			res.status(200).json(alerts);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getAlertType(req, res) {
		const alertType = await AlertType.query().select("id", "name_alert");
		res.status(200).json(alertType);
	}

	async doneAlert(req, res) {
		const id = req.params.id;
		const alert = await Alert.query().findById(id).patch({ status_alert: 2 });
		res.status(201).json(alert);
	}
}

module.exports = new AlertController();
