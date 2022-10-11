const cron = require("node-cron");
const axios = require("axios");
const Alert = require("../models/Alert");
const Receiver = require("../models/Receiver");
const AlertReceiver = require("../models/AlertReceiver");
const nodemailer = require("nodemailer");

function Telegram(addition, message, count, address) {
	const allMessage = "Liczba błędów: " + count + " " + message;
	axios.get(
		"http://pikora.wamasof2.vot.pl/config/message?user=DOWOLNANAZWA&sender=" +
			addition.name +
			"&message=" +
			allMessage +
			"&receiver=" +
			address
	);
}

function sendEmail(receiver, message, count, typeAlert) {
	let transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		secure: false,
		auth: {
			user: "mailnastronezgrami@gmail.com",
			pass: "bordsgedxeygovnp",
		},
	});

	const allTitle = "błąd: " + " " + typeAlert;
	const allMessage = "Liczba błędów: " + count + " " + message;
	let mailOptions = {
		from: "mailnastronezgrami@gmail.com",
		to: receiver,
		subject: allTitle,
		text: allMessage,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
}

async function alertReceivers(id_receiver, id_alert) {
	try {
		newAlertReceiver = await AlertReceiver.query().insert({
			id_receiver,
			id_alert,
		});
		alertStatus = await Alert.query()
			.findById(id_alert)
			.patch({ status_alert: 1 });
	} catch (err) {
		return res.status(422).json({ message: err.message });
	}
}

function sendAlert() {
	cron.schedule("* * * * *", async function alert() {
		const alerts = await Alert.query()
			.select(
				"alerts.id",
				"alerts.id_location",
				"alerts.id_type",
				"alerts.message",
				"alerts.count",
				"alerts.status_alert",
				"alert_types.name_alert"
			)
			.innerJoin("alert_types", "alerts.id_type", "alert_types.id")
			.where("alerts.status_alert", 0)
			.where("alerts.status_alert", 1);

		const receivers = await Receiver.query()
			.select(
				"receivers.name_receiver",
				"receivers.type_receiver",
				"receivers.address",
				"receivers.addition",
				"alert_type_receivers.id",
				"alert_type_receivers.id_location",
				"alert_type_receivers.id_alert_type",
				"alert_type_receivers.interval_receiver",
				"alert_types.name_alert"
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
			);

		for (const alert of alerts) {
			for (const receiver of receivers) {
				const d = new Date();
				if (d.getMinutes() % receiver["interval_receiver"] == 0) {
					if (
						alert["id_location"] === receiver["id_location"] &&
						receiver["id_alert_type"] === null
					) {
						if (receiver["type_receiver"] === "telegram") {
							console.log("telegram type null");
							// const addition = JSON.parse(receiver["addition"]);
							// Telegram(addition, alert["message"], alert["count"], receiver["address"]);
							// if(alert['status_alert'] === 0)
							// 	alertReceivers(receiver['id'], alert['id'])
						}
						if (receiver["type_receiver"] === "email") {
							console.log("email type null");
							// sendEmail(
							// 	receiver["address"],
							// 	alert["message"],
							// 	alert["count"],
							// 	alert["name_alert"]
							// );
							// if(alert['status_alert'] === 0)
							// 	alertReceivers(receiver['id'], alert['id'])
						}
					} else if (
						alert["id_type"] === receiver["id_alert_type"] &&
						receiver["id_location"] === null
					) {
						if (receiver["type_receiver"] === "telegram") {
							console.log("telegram location null");
							// const addition = JSON.parse(receiver["addition"]);
							// Telegram(addition, alert["message"], alert["count"], receiver["address"]);
							// if(alert['status_alert'] === 0)
							// 	alertReceivers(receiver['id'], alert['id'])
						}
						if (receiver["type_receiver"] === "email") {
							console.log("email location null");
							// sendEmail(
							// 	receiver["address"],
							// 	alert["message"],
							// 	alert["count"],
							// 	alert["name_alert"]
							// );
							// if(alert['status_alert'] === 0)
							// 	alertReceivers(receiver['id'], alert['id'])
						}
					} else if (
						alert["id_type"] === receiver["id_alert_type"] &&
						alert["id_location"] === receiver["id_location"]
					) {
						if (receiver["type_receiver"] === "telegram") {
							console.log("telegram oba");
							// const addition = JSON.parse(receiver["addition"]);
							// Telegram(addition, alert["message"], alert["count"], receiver["address"]);
							// if(alert['status_alert'] === 0)
							// 	alertReceivers(receiver['id'], alert['id'])
						}
						if (receiver["type_receiver"] === "email") {
							console.log("email oba");
							// sendEmail(
							// 	receiver["address"],
							// 	alert["message"],
							// 	alert["count"],
							// 	alert["name_alert"]
							// );
							// if(alert['status_alert'] === 0)
							// 	alertReceivers(receiver['id'], alert['id'])
						}
					}
				}
			}
		}
	});
}

module.exports = sendAlert();
