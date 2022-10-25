const User = require("../models/User");
const sendEmail = require("../sendEmail.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserController {
	async login(req, res) {
		const { email, password } = req.body;

		const userCheck = await User.query()
			.select("id", "password", "isActive")
			.where("email", email);

		if (userCheck.length === 0) {
			return res.status(401).json({ message: "Błędny login lub hasło" });
		}

		const validPassword = await bcrypt.compare(
			password,
			userCheck[0]["password"]
		);

		if (!validPassword)
			return res.status(401).json({ message: "Błędny login lub hasło" });

		if (parseInt(userCheck[0]["isActive"]) === 0) {
			return res.status(401).json({ message: "Konto nie aktywne" });
		}

		req.session.user = userCheck[0]["id"];
		console.log(req.session);
		res.status(200).json({ message: "zalogowany" });
		// res.redirect("/")
	}

	async test(req, res) {
		console.log(req.session);
		res.send("test");
	}
	async logout(req, res) {
		req.session.destroy();
		// res.send("wylogowany")
		res.status(200).json({ message: "wylogowany" });
		// res.redirect("/")
	}

	async registerUser(req, res) {
		const { email, password } = req.body;

		const userCheck = await User.query()
			.select("id", "email", "password")
			.where("email", email);

		if (userCheck.length !== 0) {
			if (email === userCheck[0]["email"]) {
				res.send("Użytkownik o podanym adresie e-mail juz istnieje");
				return;
			}
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		let newUser;
		try {
			newUser = await User.query().insert({
				email,
				password: hashPassword,
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

		const token = jwt.sign(payload, secret, { expiresIn: "10000s" });
		const link = `http://localhost:4000/potwierdz/${id}${token}`;
		sendEmail(email, "Aktywuj konto", link);
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

		const email = user[0]["email"];
		const secret = process.env.JWT_TOKEN + email;

		try {
			const payload = jwt.verify(token, secret);
			const userConfirm = await User.query()
				.findById(id)
				.patch({ isActive: 1 });

			res.status(201).json(userConfirm);
			// przenies do logowania
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

		const token = jwt.sign(payload, secret, { expiresIn: "10m" });
		const link = `http://localhost:4000/resetuj-haslo/${id}${token}`;
		sendEmail(email, "change password", link);
		res.send("send");
	}

	async changeForgotPassword(req, res) {
		const { id, token } = req.params;
		const { password, password2 } = req.body;
		console.log(password);

		const user = await User.query()
			.select("id", "email", "password")
			.where("id", id);

		console.log(req.body);

		if (parseInt(id) !== user[0]["id"]) {
			res.send("Brak uzytkownika");
			return;
		}

		const secret = process.env.JWT_TOKEN + user[0]["password"];

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		try {
			const payload = jwt.verify(token, secret);
			const userUpdate = await User.query()
				.findById(id)
				.patch({ password: hashPassword });

			res.status(201).json(userUpdate);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}
	}

	async changePassword(req, res) {}

	async deleteUser(req, res) {}
}

module.exports = new UserController();
