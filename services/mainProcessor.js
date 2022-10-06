const { createQuery } = require("./createQuery");

const mainProcessor = async (req, res, next) => {
	if (req.route.path === "/createquery/:orgid") {
		await createQuery(req, res, next);
	}
};

module.exports = {
	mainProcessor,
};
