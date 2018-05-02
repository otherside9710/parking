const mysql = require('mysql');

module.exports = () =>{
	return mysql.createConnection({
		host     : '192.168.0.20',
    	user     : 'SYSTEM',
    	password : 'MANAGER*',
    	database : 'parking'
	});
}