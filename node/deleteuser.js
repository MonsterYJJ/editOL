


//创建连接  
var mysql = require('mysql');
connection=mysql.createConnection({    
  host     : '127.0.0.1',      
  user     : 'root',             
  password : '001256',      
  port: '3306',                  
  database: 'editol2',
});
connection.connect();

var  userGetSql = 'DELETE FROM tb_users WHERE id = ?';
var userModSql_Params = ["4"];

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