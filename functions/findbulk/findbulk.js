'use strict';

const utils = require('../../includes/utils.js');
const config = require('../../includes/config.json');
const mysql = require('../../node_modules/mysql');

let pool = mysql.createPool(config.database);

module.exports.findbulk = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let obj = {};
  let counter = 0;
  const body = event.pathParameters.ids;
  //const body = JSON.parse(event.body);
  const theBulk = body.split(',');

  theBulk.forEach(function(id){
    obj[id] = {};
    pool.query("SELECT COUNT(*) as count FROM (SELECT * FROM `gceval` WHERE `gceval`.`postid` = " + id + " ) AS `gceval`", function (error, results, fields) {
      if (error) {
        callback(error);
      } else {
        obj[id].total = results[0].count;
        pool.query("SELECT AVG(`gceval`.`stars`) AS stars FROM `gceval` AS `gceval`  WHERE `gceval`.`postid` = " + id + "", function (error, results, fields) {
          if (error) {
            callback(error);
          } else {
            obj[id].stars = results[0].stars;
            counter++;
            if (counter === theBulk.length){
              callback(null, utils.resolve(obj));
            }
          }
        });
      }
    });
  });

};
