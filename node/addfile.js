
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

var  userGetSql = 'INSERT INTO tb_files(id,file_name,file_date,file_text,file_by) VALUES(0,?,?,?,?)';
var userModSql_Params = ["ann","ann","ann","1"];

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