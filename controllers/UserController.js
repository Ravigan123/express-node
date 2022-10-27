const User = require("../models/User");
const sendEmail = require("../sendEmail.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passwordValidator = require("password-validator");

class UserController {
	async login(req, res) {
		const { email, password } = req.body;

		try {
			const userCheck = await User.query()
				.select("id", "password", "isActive")
				.where("email", email);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}

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
		const { email, password, password2 } = req.body;

		if (password !== password2)
			return res.status(401).json({ message: "Hasła nie są identyczne" });

		// const schema = new passwordValidator();
		// schema
		// 	.is()
		// 	.min(8) // Minimum length 8
		// 	.has()
		// 	.symbols(1) // znak specjalny
		// 	.is()
		// 	.max(100) // Maximum length 100
		// 	.has()
		// 	.uppercase() // Must have uppercase letters
		// 	.has()
		// 	.lowercase() // Must have lowercase letters
		// 	.has()
		// 	.digits(2) // Must have at least 2 digits
		// 	.has()
		// 	.not()
		// 	.spaces() // Should not have spaces
		// 	.is()
		// 	.not()
		// 	.oneOf(["Passw0rd", "Password123"]);

		// const validPassword = schema.validate(password);
		// if (!validPassword)
		// 	return res.status(401).json({ message: "Hasło jest zbyt mało złożone" });

		try {
			const userCheck = await User.query()
				.select("id", "email", "password")
				.where("email", email);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}

		if (userCheck.length !== 0) {
			if (email === userCheck[0]["email"]) {
				res.send("Użytkownik o podanym adresie e-mail juz istnieje");
				return;
			}
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		try {
			const newUser = await User.query().insert({
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
		const link = `${process.env.API_URL}/confirm/${id}${token}`;
		sendEmail(email, "Aktywuj konto", link);
		res.send("send");
	}

	async confirmUser(req, res) {
		const { id, token } = req.params;

		try {
			const user = await User.query()
				.select("id", "email", "password")
				.where("id", id);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}

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

		try {
			const user = await User.query()
				.select("id", "email", "password")
				.where("email", email);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}

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
		const link = `${process.env.API_URL}/reset-password/${id}${token}`;
		sendEmail(email, "change password", link);
		res.send("send");
	}

	async changeForgotPassword(req, res) {
		const { id, token } = req.params;
		const { password, password2 } = req.body;

		try {
			const user = await User.query()
				.select("id", "email", "password")
				.where("id", id);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}

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

	async changePassword(req, res) {
		// const id = parseInt(req.session.user);
		const id = 3;
		const { password, newPassword, newPassword2 } = req.body;

		if (newPassword !== newPassword2)
			return res.status(401).json({ message: "Hasła nie są identyczne" });

		// const schema = new passwordValidator();
		// schema
		// 	.is()
		// 	.min(8) // Minimum length 8
		// 	.has()
		// 	.symbols(1) // znak specjalny
		// 	.is()
		// 	.max(100) // Maximum length 100
		// 	.has()
		// 	.uppercase() // Must have uppercase letters
		// 	.has()
		// 	.lowercase() // Must have lowercase letters
		// 	.has()
		// 	.digits(2) // Must have at least 2 digits
		// 	.has()
		// 	.not()
		// 	.spaces() // Should not have spaces
		// 	.is()
		// 	.not()
		// 	.oneOf(["Passw0rd", "Password123"]);

		// const validPassword = schema.validate(newPassword);
		// if (!validPassword)
		// 	return res.status(401).json({ message: "Hasło jest zbyt mało złożone" });

		try {
			const user = await User.query()
				.select("email", "password")
				.where("id", id);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}

		console.log(user[0]["password"]);

		const validPasswordInBase = await bcrypt.compare(
			password,
			user[0]["password"]
		);

		if (!validPasswordInBase)
			return res.status(401).json({ message: "Błędne hasło" });

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(newPassword, salt);

		try {
			const userUpdate = await User.query()
				.findById(id)
				.patch({ password: hashPassword });

			res.status(201).json(userUpdate);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}
	}

	async deleteUser(req, res) {
		// const id = req.session.user;
		const id = 2;
		try {
			const user = await User.query()
				.deleteById(id)
				.where("id", req.session.user);
		} catch (error) {
			console.log(error);
			res.send(error.message);
		}
		// res.redirect("/")
		res.sendStatus(204);
	}
}

module.exports = new UserController();
