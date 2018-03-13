'use strict';

// MySQL.create:  INSERT INTO `gceval` (`postid`, `stars`, `ip`, `createdAt`)
//                 values (1651, 5, '000.000.000.000', '2018-03-13 19:26:08')

module.exports.vote = (event, context, callback) => {

  var utils = require("../../includes/utils.js");

  callback(null, utils.resolve(event));

};
