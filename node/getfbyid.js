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

var  userGetSql = 'SELECT * FROM tb_files where id = ?';
var userModSql_Params = [];
userModSql_Params.push(file.id);
connection.query( 
  userGetSql,userModSql_Params ,
  function selectCb(err, results, fields) { 
    if (err) { 
      throw err; 
    } 
       if(results.length>0)
      {     var  f = Object.create(null);
            f.file_name = results[0].file_name;
            f.file_by = results[0].file_by ;
            f.file_date = results[0].file_date;
            f.id = results[0].id;
            f.file_text = results[0].file_text;
         
          
        
            console.log(f);
              response.writeHead(200,{"Content-Type":"text/html"});
                response.write(JSON.stringify(f));
                   response.end();
      }   
    connection.end(); 
  } 
);
}