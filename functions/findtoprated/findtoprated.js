'use strict';

const utils = require('../../includes/utils.js');
const config = require('../../includes/config.json');
const mysql = require('../../node_modules/mysql');

let pool = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database
});

module.exports.findtoprated = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  pool.getConnection(function(err, connection) {
    connection.query('SELECT postid, count(postid) as total,avg(stars) as stars FROM gceval group by postid having total > 5 order by stars desc,total desc LIMIT 10', function (error, results, fields) {
      connection.release();

      if (error) callback(error);
      else callback(null, utils.resolve(results));
    });
  });

};
