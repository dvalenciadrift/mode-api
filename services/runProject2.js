require("dotenv").config();
var axios = require("axios");
const token = process.env.MODE_API_TOKEN;
const password = process.env.MODE_API_PASSWORD;
const report = process.env.REPORT;

const auth = Buffer.from(`${token}:${password}`).toString("base64");

const runProject2 = async () => {
  const config = {
    method: "post",
    url: `https://app.mode.com/api/driftinc/reports/${report}/runs`,
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      Accept: "application/hal+json",
    },
  };

  const runReportResponse = await axios(config)
    .then(function (response) {
      
      return response;
    })
    .catch(function (error) {
      console.log(error);
      
      return error;
    });

  if (runReportResponse instanceof Error) {
    return runReportResponse;
  } else {
    return checkState(runReportResponse);
  }
};

const checkState = async (resp) => {

  let runToken = resp.data?.token;

  const config = {
    method: "get",
    url: `https://app.mode.com/api/driftinc/reports/${report}/runs/${runToken}`,
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      Accept: "application/hal+json",
    },
  };

  let getRun = await axios(config)
    .then((response) => {
      console.log("getRun");
      if (response.data.state == "enqueued" || response.data.state == "pending") {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve(checkState(response));
          }, 1500);
        });
      } else {
        return response;
      }
    })
    .catch(function (error) {
      console.log(error);
      
      return error;
    });

  return getRun;
};



// For testing only----------
(async ()=>{
  let ans = await runProject2();
  console.log(ans.data.state);

})()
//----------------------------

module.exports = {
  runProject2,
};
