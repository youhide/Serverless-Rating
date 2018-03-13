'use strict';

module.exports.resolve = (input) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(input)
  };

  return response;

};
