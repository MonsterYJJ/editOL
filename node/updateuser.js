var mysql = require('mysql');
var connection = mysql.createConnection({    
  host     : '127.0.0.1',      
  user     : 'root',             
  password : '123456',      
  port: '3306',                  
  database: 'editol',
});
connection.connect();

var  userGetSql = 'UPDATE tb_users SET user_id = ?,user_pwd = ?,user_name = ?  WHERE id = ?';
var userModSql_Params = ["alice","alice","alice","4"];
connection.query( 
  userGetSql,userModSql_Params ,
  function selectCb(err, results, fields) { 
    if (err) { 
      throw err; 
    } 
       if(results)
      {
          console.log('-------------UPDATE--------------');
      }   
    connection.end(); 
  } 
);