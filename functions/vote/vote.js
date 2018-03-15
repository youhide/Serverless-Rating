'use strict';

const utils = require('../../includes/utils.js');
const config = require('../../includes/config.json');
const mysql = require('../../node_modules/mysql');

let pool = mysql.createPool(config.database);

module.exports.vote = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const body = JSON.parse(event.body);

  pool.query("INSERT INTO `gceval` (`postid`, `stars`, `ip`, `createdAt`) values (" + body.postid + ", " + body.stars + ", '" + body.ip + "', CONVERT_TZ(NOW(),'SYSTEM','America/Sao_Paulo'))", function (error, results, fields) {
    if (error) callback(error);
    else callback(null, utils.resolve(results));
  });

};
