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

var  userGetSql = 'SELECT * FROM tb_files where file_by = ?';
var userModSql_Params = [];
userModSql_Params.push(file.by);
connection.query( 
  userGetSql,userModSql_Params ,
  function selectCb(err, results, fields) { 
    if (err) { 
      throw err; 
    } 
       if(results)
      { var files = [];
          for(var i = 0; i < results.length; i++)
          { var  f = Object.create(null);
            
            f.file_name = results[i].file_name;
            f.file_by = results[i].file_by ;
            f.file_date = results[i].file_date;
            f.id = results[i].id;
            f.file_text = results[i].file_text;
         
            files.push(f);
          }
            console.log(files);
              response.writeHead(200,{"Content-Type":"text/html"});
                response.write(JSON.stringify(files));
                   response.end();
      }   
    connection.end(); 
  } 
);
}