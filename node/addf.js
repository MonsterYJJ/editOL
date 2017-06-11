module.exports = function (file,request,response) {
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
var userModSql_Params = [];
userModSql_Params.push(file.name);

var date = new Date(); 
var year = date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();
var time = year + "-" + month +"-"+ day;

userModSql_Params.push(time);
userModSql_Params.push("欢迎使用在线文档 \n\n在线文档，一份在线编辑、实时保存的文档，还可以轻松邀请好友来一起协作编辑。\n\n以下是一些在线文档使用小技巧：\n\n1、在线编辑，实时保存\n在线编辑，告别繁重的office软件；实时保存，不用担心编辑丢失。\n\n2、将文档分享给好友 \n将邀请码告诉好友。\n\n3、与好友共同编辑一起编辑文档。 \n\n4、边写边聊。 \n\n至此，在线文档使用技巧已get。");
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