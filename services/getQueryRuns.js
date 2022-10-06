var axios = require("axios");
const token = process.env.MODE_API_TOKEN;
const password = process.env.MODE_API_PASSWORD;

const auth = Buffer.from(`${token}:${password}`).toString("base64");

const getQueryRuns = async (queryToken) => {
	const config = {
		method: "get",
		url: `https://app.mode.com/api/driftinc/reports/429b5850f0be/queries/${queryToken}/runs`,
		headers: {
			Authorization: `Basic ${auth}`,
			"Content-Type": "application/json",
			Accept: "application/hal+json",
		},
	};

	return axios(config)
		.then(function (response) {
			return response;
		})
		.catch(function (error) {
			console.log(error);
		});
};

module.exports = {
	getQueryRuns,
};
