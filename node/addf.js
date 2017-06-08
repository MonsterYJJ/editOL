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
var  userGetSql = 'INSERT INTO tb_files(id,file_name,file_date,file_text,file_by) VALUES(0,?,?,?,?)';
var userModSql_Params = [];
userModSql_Params.push(file.name);

var date = new Date(); 
var year = date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();
var time = year + "-" + month +"-"+ day;

userModSql_Params.push(time);
userModSql_Params.push('');
userModSql_Params.push(file.by);

    connection.query( 
  userGetSql, userModSql_Params,
  function selectCb(err, results) { 
    if (err) { 
      throw err; 
    } 
       if(results)
      {
           response.send();
            console.log('-------INSERT----------');
      }   
    connection.end(); 
  } 
);
}