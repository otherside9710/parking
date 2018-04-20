require('./connection.js')	

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("select * from zonas", function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
});