const { mainProcessor } = require("../services/mainProcessor");

const processEndpoint = async (req, res, next) => {
	//console.log("process endpoint", req.params);
	await mainProcessor(req, res, next);
	//next();
};

module.exports = {
	processEndpoint,
};
