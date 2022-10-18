const auth = function (req, res, next) {
	console.log(req.session)
	if (typeof req.session.user !== "undefined") return next()
	else return res.status(401).json({ message: "zaloguj sie" })
}

module.exports = auth
