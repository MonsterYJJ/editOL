var mysql = require('mysql');
var connection = mysql.createConnection({    
  host     : '127.0.0.1',      
  user     : 'root',             
  password : '123456',      
  port: '3306',                  
  database: 'editol',
});
connection.connect();

var  userGetSql = 'SELECT * FROM tb_users where user_id = ?';
var userModSql_Params = ["admin"];
connection.query( 
  userGetSql,userModSql_Params ,
  function selectCb(err, results, fields) { 
    if (err) { 
      throw err; 
    } 
       if(results)
      {
          for(var i = 0; i < results.length; i++)
          {
              console.log("%d\t%s\t%s", results[i].id, results[i].user_name, results[i].user_id);
          }
      }   
    connection.end(); 
  } 
);