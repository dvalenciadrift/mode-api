//require("dotenv").config();
var axios = require("axios");
const token = process.env.MODE_API_TOKEN;
const password = process.env.MODE_API_PASSWORD;

const auth = Buffer.from(`${token}:${password}`).toString("base64");

const getContent = async (queryRunResultEndpoint) => {
	const config = {
		method: "get",
		url: `https://app.mode.com/${queryRunResultEndpoint}/content.json`,
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
			console.log("Content Error");
		});
};

module.exports = {
	getContent,
};
