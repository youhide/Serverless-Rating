'use strict';

module.exports.resolve = (input) => {
  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(input)
  };

  return response;

};
