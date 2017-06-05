var mysql = require('mysql');


//创建连接  
var connection = mysql.createConnection({    
  host     : '127.0.0.1',      
  user     : 'root',             
  password : '123456',      
  port: '3306',                  
  database: 'editol',
});
connection.connect();

var  userGetSql = 'INSERT INTO tb_users(id,user_id,user_pwd,user_name) VALUES(0,?,?,?)';
var userModSql_Params = ["ann","ann","ann"];

connection.query( 
  userGetSql, userModSql_Params,
  function selectCb(err, results) { 
    if (err) { 
      throw err; 
    } 
       if(results)
      {
            console.log('-------INSERT----------');
      }   
    connection.end(); 
  } 
);