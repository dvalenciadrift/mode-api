var axios = require("axios");
const token = process.env.MODE_API_TOKEN;
const password = process.env.MODE_API_PASSWORD;

const { runProject } = require("./runProject");
const { processRequest } = require("./processRequest");

const auth = Buffer.from(`${token}:${password}`).toString("base64");

const createQueryURL =
	"https://app.mode.com/api/driftinc/reports/0f420bf27e2c/queries";
const runProjectURL =
	"https://app.mode.com/api/driftinc/reports/0f420bf27e2c/runs";

const createQuery = async (req, res, next) => {
	console.log(req.params.orgid);
	var data = JSON.stringify({
		query: {
			data_source_id: 16659,
			raw_query: `SELECT * FROM SEGMENT.PRODUCT.PLAYBOOK_FACTS WHERE ORG_ID IN (${req.params.orgid}) LIMIT 5`,
			name: "query from Node",
		},
	});

	const config = {
		method: "post",
		url: createQueryURL,
		headers: {
			Authorization: `Basic ${auth}`,
			"Content-Type": "application/json",
			Accept: "application/hal+json",
		},
		data: data,
	};

	axios(config)
		.then(function (response) {
			const queryToken = response.data.token;
			console.log("query Token", queryToken);
			runProject().then((runResponse) => {
				processRequest(10, queryToken, res, next);
			});
		})
		.catch(function (error) {
			console.log(error);
		});
};

module.exports = {
	createQuery,
};
