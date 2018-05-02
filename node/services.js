var express = require('express');
var app = express();
var db = require('./connection');

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "select * from zonas";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

