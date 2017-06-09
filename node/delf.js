module.exports = function (file,request,response) {

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

var  userGetSql = 'DELETE FROM tb_files WHERE id = ?';
var userModSql_Params = [];
userModSql_Params.push(file.id);
connection.query( 
  userGetSql, userModSql_Params,
  function selectCb(err, results) { 
    if (err) { 
      throw err; 
    } 
       if(results)
      {
         response.send();
          console.log('-------------DELETE--------------');
      }   
    connection.end(); 
  } 
);
}