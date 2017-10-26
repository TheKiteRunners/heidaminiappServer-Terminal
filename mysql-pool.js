var mysql = require('mysql2/promise');  
var mysql_pool = mysql.createPool({  
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'heida',
});  
module.exports = mysql_pool;  