const User = require("../models/User");
const sendEmail = require("../sendEmail.js");
const jwt = require("jsonwebtoken");

class UserController {
	async registerUser(req, res) {
		const { email, password } = req.body;

		const userCheck = await User.query()
			.select("id", "email", "password")
			.where("email", email);

		if (userCheck.length !== 0) {
			if (email === userCheck[0]["email"]) {
				res.send("Użytkownik juz istnieje");
				return;
			}
		}

		let newUser;
		try {
			newUser = await User.query().insert({
				email,
				password,
				isActive: 0,
			});
		} catch (err) {
			return res.status(422).json({ message: err.message });
		}

		const user = await User.query().select("id").where("email", email);

		const id = user[0]["id"];
		const secret = process.env.JWT_TOKEN + email;
		const payload = {
			email,
			id,
		};

		const token = jwt.sign(payload, secret, { expiresIn: "120s" });
		const link = `http://localhost:4000/confirm/${id}${token}`;
		sendEmail(email, "Confirm email", link);
		res.send("send");
	}
	async confirmUser(req, res) {
		const { id, token } = req.params;

		const user = await User.query()
			.select("id", "email", "password")
			.where("id", id);

		if (parseInt(id) !== user[0]["id"]) {
			res.send("Brak uzytkownika");
			return;
		}

		const secret = process.env.JWT_TOKEN + user[0]["email"];
		const email = user[0]["email"];
		try {
			const payload = jwt.verify(token, secret);
			const userConfirm = await User.query()
				.findById(id)
				.patch({ isActive: 1 });

			res.status(200).json(userConfirm);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}
	}
	async sendForgotPassword(req, res) {
		const { email } = req.body;

		const user = await User.query()
			.select("id", "email", "password")
			.where("email", email);

		if (email !== user[0]["email"]) {
			res.send("Brak uzytkownika");
			return;
		}

		const id = user[0]["id"];
		const secret = process.env.JWT_TOKEN + user[0]["password"];
		const payload = {
			email,
			id,
		};

		const token = jwt.sign(payload, secret, { expiresIn: "120s" });
		const link = `http://localhost:4000/reset-password/${id}${token}`;
		sendEmail(email, "change password", link);
		res.send("send");
	}
	async changeForgotPassword(req, res) {
		const { id, token } = req.params;
		const { password, password2 } = req.body;

		const user = await User.query()
			.select("id", "email", "password")
			.where("id", id);

		console.log(req.body);

		if (parseInt(id) !== user[0]["id"]) {
			res.send("Brak uzytkownika");
			return;
		}

		const secret = process.env.JWT_TOKEN + user[0]["password"];

		try {
			const payload = jwt.verify(token, secret);
			const userUpdate = await User.query().findById(id).patch({ password });

			res.status(200).json(userUpdate);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}
	}
}

module.exports = new UserController();
