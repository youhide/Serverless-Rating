'use strict';

// MySQL.create:  INSERT INTO `gceval` (`postid`, `stars`, `ip`, `createdAt`)
//                 values (1651, 5, '000.000.000.000', '2018-03-13 19:26:08')

// new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"})
// new Date().toISOString().slice(0, 19).replace('T', ' ');

const utils = require('../../includes/utils.js');
const config = require('../../includes/config.json');
const mysql = require('../../node_modules/mysql');

let pool = mysql.createPool(config.database);

module.exports.vote = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const body = JSON.parse(event.body);

  pool.getConnection(function(err, connection) {
    connection.query("INSERT INTO `gceval` (`postid`, `stars`, `ip`, `createdAt`) values (" + body.postid + ", " + body.stars + ", '" + body.ip + "', CONVERT_TZ(NOW(),'SYSTEM','America/Sao_Paulo'))", function (error, results, fields) {
      connection.release();
      if (error) callback(error);
      else callback(null, utils.resolve(results));
    });
  });

};
