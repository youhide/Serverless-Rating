'use strict';

// MYSQL.find:  SELECT AVG(`gceval`.`stars`) AS stars
//               FROM `gceval` AS `gceval`  WHERE `gceval`.`postid` = "24505"
// MYSQL.count:  SELECT COUNT(*) as count
//               FROM (SELECT * FROM `gceval` WHERE `gceval`.`postid` = "24505" ) AS `gceval`

module.exports.findone = (event, context, callback) => {

  var utils = require("../../includes/utils.js");

  callback(null, utils.resolve(event));

};
