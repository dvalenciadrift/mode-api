//require("dotenv").config();
var axios = require("axios");
const token = process.env.MODE_API_TOKEN;
const password = process.env.MODE_API_PASSWORD;

const auth = Buffer.from(`${token}:${password}`).toString("base64");

const deleteQuery = async (queryToken) => {
	const config = {
		method: "delete",
		url: `https://app.mode.com/api/driftinc/reports/429b5850f0be/queries/${queryToken}`,
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
	deleteQuery,
};
