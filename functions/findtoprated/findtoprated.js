'use strict';

const utils = require('../../includes/utils.js');
const config = require('../../includes/config.json');
const mysql = require('../../node_modules/mysql');

let pool = mysql.createPool(config.database);

module.exports.findtoprated = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  pool.query('SELECT postid, count(postid) as total,avg(stars) as stars FROM gceval group by postid having total > 5 order by stars desc,total desc LIMIT 10', function (error, results, fields) {
    if (error) callback(error);
    else callback(null, utils.resolve(results));
  });

};
