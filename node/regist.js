module.exports = function (user,request,response) {
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
var userModSql_Params = [];
userModSql_Params.push(user.userid)
connection.query( 
  userGetSql,userModSql_Params ,
  function selectCb(err, results, fields) { 
    if (err) { 
      throw err; 
    } ;
       if(results.length>0)
      {    
      
         response.send("账号已存在");
        console.log('-------账号已存在----------');
      } 
        else{
        userGetSql = 'INSERT INTO tb_users(id,user_id,user_pwd,user_name) VALUES(0,?,?,?)';
        userModSql_Params.push(user.pwd)
        userModSql_Params.push(user.name);
        connection.query( 
        userGetSql, userModSql_Params,
        function selectCb(err, results) { 
    if (err) { 
      throw err; 
    } 
       if(results)
      { response.send("-------INSERT----------");
            console.log('-------INSERT----------');
           
      }   
    
  } 
);

}  
    connection.end(); 
  } 
);





}