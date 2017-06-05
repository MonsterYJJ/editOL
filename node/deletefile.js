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

var  userGetSql = 'DELETE FROM tb_files WHERE id = ?';
var userModSql_Params = ["2"];

connection.query( 
  userGetSql, userModSql_Params,
  function selectCb(err, results) { 
    if (err) { 
      throw err; 
    } 
       if(results)
      {
         
          console.log('-------------DELETE--------------');
      }   
    connection.end(); 
  } 
);