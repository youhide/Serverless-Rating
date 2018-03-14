'use strict';

module.exports.resolve = (input) => {
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  };

  return response;

};
