'use strict';

module.exports.findone = (event, context, callback) => {

  var utils = require("../../includes/utils.js");

  const mysql = require('../../node_modules/mysql');

  let con = mysql.createConnection({
    host : "xxx",
    user : "xxx",
    password : "xxx",
    database : "xxx"
  });

  con.connect();

  con.end();

  callback(null, utils.sayhello(event));

};
