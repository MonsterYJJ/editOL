module.exports = function (file,request,response) {
    var mysql = require('mysql');
var connection = mysql.createConnection({    
  host     : '127.0.0.1',      
  user     : 'root',             
  password : '123456',      
  port: '3306',                  
  database: 'editol',
});
connection.connect();

var  userGetSql = 'UPDATE tb_files SET file_text = ? WHERE id = ?';
var userModSql_Params = [];
userModSql_Params.push(file.text);
userModSql_Params.push(file.id);
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
}