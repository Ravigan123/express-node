const isLogged = function (req, res, next) {
	if (typeof req.session.user !== "undefined") res.redirect("/")
	else return next()
}

module.exports = isLogged
