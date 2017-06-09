var getusers=Object.create(null);
getusers.users=[];

getusers. get = function(user_id){

var mysql = require('mysql');
connection=mysql.createConnection({    
  host     : '127.0.0.1',      
  user     : 'root',             
  password : '001256',      
  port: '3306',                  
  database: 'editol2',
});
connection.connect();
var  userGetSql = 'SELECT * FROM tb_users where user_id = ?';
var userModSql_Params = [];
userModSql_Params.push(user_id);

connection.query( 
  userGetSql,userModSql_Params ,
  function selectCb(err, results, fields) { 
    if (err) { 
      throw err; 
    } ;
       if(results)
      {    getusers.users = [];
          for(var i = 0; i < results.length; i++)
          {   var user = Object.create(null);
                user.id = results[i].id;
                user.name = results[i].user_name;
                user.userid = results[i].user_id;
                user.pwd = results[i].user_pwd;      
                getusers.users.push(user);
                console.log(getusers.users);    
          }
      }   
    connection.end(); 
  } 
);
return 
}

module.exports = getusers;