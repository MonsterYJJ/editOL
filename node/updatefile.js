
var mysql = require('mysql');
connection=mysql.createConnection({    
  host     : '127.0.0.1',      
  user     : 'root',             
  password : '001256',      
  port: '3306',                  
  database: 'editol2',
});
connection.connect();

var  userGetSql = 'UPDATE tb_files SET file_name = ?,file_date = ?,file_text = ?,file_by=?  WHERE id = ?';
var userModSql_Params = ["alice","alice","ann","1","3"];
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