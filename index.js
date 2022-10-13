require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/route");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
// const path = require("path");
// const delArchive = require("./schedule/deleteArchive");
// const send = require("./schedule/send");
// const sendAlert = require("./schedule/sendAlert");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// app.use("/users", users);
// app.use("/password-reset", passwordReset);

const sendEmail = async (email, subject, text) => {
	try {
		let transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			secure: false,
			auth: {
				user: "mailnastronezgrami@gmail.com",
				pass: "bordsgedxeygovnp",
			},
		});

		await transporter.sendMail({
			from: "mailnastronezgrami@gmail.com",
			to: "bialy199912@gmail.com",
			subject: subject,
			text: text,
		});

		console.log("email sent sucessfully");
	} catch (error) {
		console.log(error, "email not sent");
	}
};

// app.use("/", router)

const JWT_TOKEN = "cos";

app.post("/forgot-password", async function (req, res, next) {
	const { email } = req.body;

	const user = await User.query()
		.select("id", "email", "password")
		.where("email", email);

	if (email !== user[0]["email"]) {
		res.send("Brak uzytkownika");
		return;
	}

	const id = user[0]["id"];
	const secret = JWT_TOKEN + user[0]["password"];
	const payload = {
		email,
		id,
	};

	const token = jwt.sign(payload, secret, { expiresIn: "120s" });
	const link = `http://localhost:4000/reset-password/${id}/${token}`;
	sendEmail(email, "change password", link);
	res.send("send");
});

app.get("/reset-password/:id/:token", async function (req, res, next) {
	const { id, token } = req.params;

	const user = await User.query()
		.select("id", "email", "password")
		.where("id", id);

	if (id === user[0]["id"]) {
		res.send("Brak uzytkownika");
		return;
	}

	const secret = JWT_TOKEN + user[0]["password"];
	const email = user[0]["email"];
	try {
		const payload = jwt.verify(token, secret);
		console.log("git");
		// res.render("reset-password", { email });
	} catch (error) {
		console.log(error);
		res.send(error.message);
	}
});

app.post("/reset-password/:id/:token", async function (req, res, next) {
	const { id, token } = req.params;
	const { password, password2 } = req.body;

	const user = await User.query()
		.select("id", "email", "password")
		.where("id", id);

	console.log(req.body);

	if (id === user[0]["id"]) {
		res.send("Brak uzytkownika");
		return;
	}

	const secret = JWT_TOKEN + user[0]["password"];

	try {
		const payload = jwt.verify(token, secret);
		const userUpdate = await User.query().findById(id).patch({ password });

		res.status(200).json(userUpdate);
	} catch (error) {
		console.log(error);
		res.send(error.message);
	}
});

app.listen(process.env.PORT, function () {
	console.log("app is working...");
});

// const fs = require("fs");

// fs.readFile("./data.txt", "utf-8", (err, data) => {
// 	if (err) throw err;
// 	console.log(data);
// });

// fs.appendFile("./data.txt", "\njakis tekst", (err) => {
// 	if (err) throw err;
// });
