
var mysql = require('mysql');
connection=mysql.createConnection({    
  host     : '127.0.0.1',      
  user     : 'root',             
  password : '001256',      
  port: '3306',                  
  database: 'editol2',
});
connection.connect();


var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8181 });
connect = {};
cun = {};

wss.on('connection', function (ws) {

    ws.on('message', function (json) {
        var msg = JSON.parse(json);
        if (msg.type == "connect") {
            var map = connect[msg.flname];
            if (map != null) {
                map[msg.name] = ws;
                connect[msg.flname] = map;
            } else {
                map = {};
                map[msg.name] = ws;
                connect[msg.flname] = map;
            }

            var userGetSql = 'SELECT * FROM tb_files where id = ?';
            var userModSql_Params = [];
            userModSql_Params.push(msg.flname);

            connection.query(
                userGetSql, userModSql_Params ,
                function selectCb(err, results, fields) {
                    if (err) {
                        throw err;
                    }
                    if (results.length > 0) {
                        var f = Object.create(null);
                        f.file_name = results[0].file_name;
                        f.file_by = results[0].file_by;
                        f.file_date = results[0].file_date;
                        f.id = results[0].id;
                        f.file_text = results[0].file_text;

                        if (cun[msg.flname] == null) {
                            var json = {};
                            json.msg = f.file_text;
                            json.type = "textc";
                            json.flname = f.file_name;
                            ws.send(JSON.stringify(json));

                            cun[msg.flname] = f.file_text;
                        } else {
                            var json = {};
                            json.msg = cun[msg.flname];
                            json.type = "textc";
                            json.flname = f.file_name;
                            ws.send(JSON.stringify(json));
                        }
                    }

                    connection.end();
                } );

        } else if (msg.type == "msgs") {

            xm = connect[msg.flname];

            xm.forEach(function (element) {
                var json = {};
                json.msg = msg.msg;
                json.type = "msgc";
                json.name = msg.name;
                if (element.readyState == 1)
                    element.send(JSON.stringify(json));
            }, this);

        } else if (msg.type == "texts") {

            xm = connect[msg.flname];

            xm.forEach(function (element) {
                var json = {};
                json.msg = msg.msg;
                json.type = "textc";
                json.name = msg.name;
                json.guang = msg.guang;
                if (element.readyState == 1)
                    element.send(JSON.stringify(json));

            }, this);
            cun[msg.flname] = msg.msg;

        } else if (msg.type == "close") {

            var userGetSql = 'UPDATE tb_files SET file_text = ? WHERE id = ?';
            var userModSql_Params = [];
            userModSql_Params.push(msg.msg, msg.flname);

            connection.query(
                userGetSql, userModSql_Params ,
                function selectCb(err, results, fields) {
                    if (err) {
                        throw err;
                    }
                    if (results.length > 0) {
                    }

                    connection.end();
                } );
        }
    });

    ws.on('close', function (close) {
        console.log('断开连接');
    });
}); 