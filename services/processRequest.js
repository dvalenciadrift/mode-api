const { getQueryRuns } = require("./getQueryRuns");
const { getContent } = require("./getContent");
const { deleteQuery } = require("./deleteQuery");

const processRequest = (counter, queryToken, res, next) => {
	getQueryRuns(queryToken).then((queryRuns) => {
		console.log(counter, queryRuns.data._embedded.query_runs[0].state);
		if (
			queryRuns.data._embedded.query_runs[0].state === "enqueued" &&
			counter > 0
		) {
			counter--;
			setTimeout(() => {
				processRequest(counter, queryToken, res, next);
			}, 100);
		} else {
			const queryRunResultEndpoint =
				queryRuns.data._embedded.query_runs[0]._links.result.href;
			console.log("query suceeded", queryRunResultEndpoint);
			getContent(queryRunResultEndpoint)
				.then((queryContent) => {
					console.log("Content", queryContent.data);
					res.locals.queryData = queryContent.data;
				})
				.catch((err) => {
					console.log(err);
				})
				.then(() => {
					deleteQuery(queryToken);
					next();
				});
		}
	});
};

module.exports = {
	processRequest,
};
