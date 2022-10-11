require("dotenv").config()
const express = require("express")
const app = express()
const router = require("./routes/route")
const bodyParser = require("body-parser")
const cors = require("cors")
// const path = require("path");
// const delArchive = require("./schedule/deleteArchive");
// const send = require("./schedule/send");
// const sendAlert = require("./schedule/sendAlert");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use("/", router)

app.listen(process.env.PORT, function () {
	console.log("app is working...")
})

// const fs = require("fs");

// fs.readFile("./data.txt", "utf-8", (err, data) => {
// 	if (err) throw err;
// 	console.log(data);
// });

// fs.appendFile("./data.txt", "\njakis tekst", (err) => {
// 	if (err) throw err;
// });
