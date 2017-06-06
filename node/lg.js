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
userModSql_Params.push(user.userid);
connection.query( 
  userGetSql,userModSql_Params ,
  function selectCb(err, results, fields) { 
    if (err) { 
      throw err; 
    } 
       if(results.length>0)
      {      var u = Object.create(null);
                u.id = results[0].id;
                u.name = results[0].user_name;
                u.userid = results[0].user_id;
                u.pwd = results[0].user_pwd;      
                console.log(u);    
            if(user.userid=== u.userid&&u.pwd===user.pwd)
            {
            request.session.id=u.id;
            request.session.name=u.name;
            request.session.userid=u.userid;
           response.send("ok");
            }
            else
            {
                response.send("账号密码错误");
            }

      }
        else
        response.send("账号不存在");   
    connection.end(); 

  } 
);


}