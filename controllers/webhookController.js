const { mainProcessor } = require("../services/mainProcessor");

const processEndpoint = async (req, res, next) => {
	await mainProcessor(req, res, next);
};

module.exports = {
	processEndpoint,
};
