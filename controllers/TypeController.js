const Type = require("../models/Type");

class TypeController {
	async getAllTypes(req, res) {
		try {
			const type = await Type.query().select("id", "name_type", "enabled");
			res.status(200).json(type);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async getTypesToSelect(req, res) {
		try {
			const type = await Type.query()
				.select("id", "name_type")
				.where("enabled", 1);
			res.status(200).json(type);
		} catch (error) {
			res.status(500).json(error);
		}
	}
}

module.exports = new TypeController();
