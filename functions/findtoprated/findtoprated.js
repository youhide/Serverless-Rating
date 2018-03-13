'use strict';

const utils = require("../../includes/utils.js");
const mysql = require('../../node_modules/mysql');
const P = require('../../node_modules/bluebird');

let pool = mysql.createPool({
  host: 'webwidgets.cyejoztggjbv.us-east-1.rds.amazonaws.com',
  user: 'widgetsuser',
  password: 'XKmUB4xBLbZsL4rQ',
  database: 'webwidgets'
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
