'use strict';

const utils = require('../../includes/utils.js');
const config = require('../../includes/config.json');
const mysql = require('../../node_modules/mysql');

let pool = mysql.createPool(config.database);

module.exports.findone = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let obj = {};

  pool.query("SELECT COUNT(*) as count FROM (SELECT * FROM `gceval` WHERE `gceval`.`postid` = " + event.queryStringParameters.id + " ) AS `gceval`", function (error, results, fields) {
    if (error) {
      callback(error);
    } else {
      obj.total = results[0].count;
      pool.query("SELECT AVG(`gceval`.`stars`) AS stars FROM `gceval` AS `gceval`  WHERE `gceval`.`postid` = " + event.queryStringParameters.id + "", function (error, results, fields) {
        if (error) {
          callback(error);
        } else {
          obj.stars = results[0].stars;
          callback(null, utils.resolve(obj));
        }
      });
    }
  });

};
