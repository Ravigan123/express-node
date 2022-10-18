require("dotenv").config()
const express = require("express")
const app = express()
const router = require("./routes/route")
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const sessions = require("express-session")
// const path = require("path");
// const delArchive = require("./schedule/deleteArchive");
// const send = require("./schedule/send");
// const sendAlert = require("./schedule/sendAlert");

const oneDay = 1000 * 60 * 60 * 24
app.use(
	sessions({
		name: "sessionID",
		secret: process.env.SESSION_TOKEN,
		saveUninitialized: true,
		cookie: { maxAge: oneDay },
		resave: false,
	})
)
app.set("trust proxy", 1)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.use("/", router)

app.listen(process.env.PORT, function () {
	console.log("app is working...")
})
