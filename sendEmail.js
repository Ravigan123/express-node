const nodemailer = require("nodemailer");

async function sendEmail(email, subject, text) {
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
			to: email,
			subject: subject,
			text: text,
		});

		console.log("email sent sucessfully");
	} catch (error) {
		console.log(error, "email not sent");
	}
}

module.exports = sendEmail;
