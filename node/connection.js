var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.0.20",
  user: "SYSTEM",
  password: "MANAGER*"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});