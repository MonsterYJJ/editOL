var http = require('http');
var url = require("url");
var path = require("path");
var express = require("express");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var fs = require("fs");
var bodyParser = require('body-parser');
var login = require("./lg");
var regist = require("./regist");
var addf = require("./addf");
var getf = require("./getf");
var delf = require("./delf");
var updatef = require("./updatef");
var getfbyid = require("./getfbyid");

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(session({
    secret: '12345',
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

var methods = Object.create(null);

var server = app.listen(8888,"0.0.0.0");


var mysql = require('mysql');

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer(
        { port: 8181 }
    );
connect = {};
cun = {};

wss.on('connection', function (ws) {
    console.log("新连接");
    ws.on('message', function (json) {
        console.log(json);
        var msg = JSON.parse(json);
        if(msg.ssname==null)
        return;
        if (msg.type == "connect") {
            var map = connect[msg.flname];
            if (map != null) {
                map[msg.ssname] = ws;
                connect[msg.flname] = map;
            } else {
                map = {};
                map[msg.ssname] = ws;
                connect[msg.flname] = map;
            }
            connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: '001256',
                port: '3306',
                database: 'editol2',
            });
            connection.connect();
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


                } );

        } else if (msg.type == "msgs") {

            xm = connect[msg.flname];

            for (element in xm) {
                var json = {};
                json.msg = msg.msg;
                json.type = "msgc";
                json.name = msg.ssname;

                xm[element].send(JSON.stringify(json));
            };

        } else if (msg.type == "texts") {

            xm = connect[msg.flname];

            for (element in xm) {
                var json = {};
                json.msg = msg.msg;
                json.type = "textc";
                json.name = msg.ssname;
                json.guang = msg.guang;

                xm[element].send(JSON.stringify(json));

            };
            cun[msg.flname] = msg.msg;

        } else if (msg.type == "close") {
            connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: '001256',
                port: '3306',
                database: 'editol2',
            });
            connection.connect();
            var userGetSql = 'UPDATE tb_files SET file_text = ? WHERE id = ?';
            var userModSql_Params = [];
            userModSql_Params.push(msg.msg, msg.flname);
            xm = connect[msg.flname];
            if (xm != null) {
                delete xm[msg.ssname];
                connection.query(
                    userGetSql, userModSql_Params ,
                    function selectCb(err, results, fields) {
                        if (err) {
                            throw err;
                        }
                        if (results.length > 0) {

                        }

                    } );
            }
        }
    });

    ws.on('close', function (close) {
        console.log('断开连接');
    });
});
app.all('*', function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});


app.get('/', function (req, res) {
    var pathname = __dirname + url.parse(req.url).pathname;
    if (path.extname(pathname) == "") {
        pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += "../login.html";
    }

    fs.exists(pathname, function (exists) {
        if (exists) {
            switch (path.extname(pathname)) {
                case ".html":
                    res.writeHead(200, { "Content-Type": "text/html" });
                    break;
                case ".js":
                    res.writeHead(200, { "Content-Type": "text/javascript" });
                    break;
                case ".css":
                    res.writeHead(200, { "Content-Type": "text/css" });
                    break;
                case ".gif":
                    res.writeHead(200, { "Content-Type": "image/gif" });
                    break;
                case ".jpg":
                    res.writeHead(200, { "Content-Type": "image/jpeg" });
                    break;
                case ".png":
                    res.writeHead(200, { "Content-Type": "image/png" });
                    break;
                default:
                    res.writeHead(200, { "Content-Type": "application/octet-stream" });
            }

            fs.readFile(pathname, function (err, data) {
                res.end(data);
            });

        } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 Not Found</h1>");
        }
    });

    //res.send("ok");
});

app.get('/list', function (req, res) {
    var pathname = __dirname + url.parse(req.url).pathname;
    if (path.extname(pathname) == "") {
        pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += "../../list.html";
    }

    fs.exists(pathname, function (exists) {
        if (exists) {
            switch (path.extname(pathname)) {
                case ".html":
                    res.writeHead(200, { "Content-Type": "text/html" });
                    break;
                case ".js":
                    res.writeHead(200, { "Content-Type": "text/javascript" });
                    break;
                case ".css":
                    res.writeHead(200, { "Content-Type": "text/css" });
                    break;
                case ".gif":
                    res.writeHead(200, { "Content-Type": "image/gif" });
                    break;
                case ".jpg":
                    res.writeHead(200, { "Content-Type": "image/jpeg" });
                    break;
                case ".png":
                    res.writeHead(200, { "Content-Type": "image/png" });
                    break;
                default:
                    res.writeHead(200, { "Content-Type": "application/octet-stream" });
            }

            fs.readFile(pathname, function (err, data) {
                res.end(data);
            });

        } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 Not Found</h1>");
        }
    });

});

app.get('/edit', function (req, res) {
    var pathname = __dirname + url.parse(req.url).pathname;
    if (path.extname(pathname) == "") {
        pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += "../../edit.html";
    }

    fs.exists(pathname, function (exists) {
        if (exists) {
            switch (path.extname(pathname)) {
                case ".html":
                    res.writeHead(200, { "Content-Type": "text/html" });
                    break;
                case ".js":
                    res.writeHead(200, { "Content-Type": "text/javascript" });
                    break;
                case ".css":
                    res.writeHead(200, { "Content-Type": "text/css" });
                    break;
                case ".gif":
                    res.writeHead(200, { "Content-Type": "image/gif" });
                    break;
                case ".jpg":
                    res.writeHead(200, { "Content-Type": "image/jpeg" });
                    break;
                case ".png":
                    res.writeHead(200, { "Content-Type": "image/png" });
                    break;
                default:
                    res.writeHead(200, { "Content-Type": "application/octet-stream" });
            }

            fs.readFile(pathname, function (err, data) {
                res.end(data);
            });

        } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 Not Found</h1>");
        }
    });

});
app.get('/login', function (req, res) {
    methods.login(req.query, req, res);
});
app.post('/login', urlencodedParser, function (req, res) {
    methods.login(req.body, req, res);
});

app.get('/regist', function (req, res) {
    methods.regist(req.query, req, res);
});
app.post('/regist', urlencodedParser, function (req, res) {
    methods.regist(req.body, req, res);
});

app.get('/addf', function (req, res) {
    methods.addf(req.query, req, res);
});
app.post('/addf', urlencodedParser, function (req, res) {
    methods.addf(req.body, req, res);
});
app.get('/getf', function (req, res) {
    methods.getf(req.query, req, res);
});
app.post('/getf', urlencodedParser, function (req, res) {
    methods.getf(req.body, req, res);
});
app.get('/delf', function (req, res) {
    methods.delf(req.query, req, res);
});
app.post('/delf', urlencodedParser, function (req, res) {
    methods.delf(req.body, req, res);
});
app.get('/updatef', function (req, res) {
    methods.updatef(req.query, req, res);
});
app.post('/updatef', urlencodedParser, function (req, res) {
    methods.updatef(req.body, req, res);
});
app.get('/getfbyid', function (req, res) {
    methods.getfbyid(req.query, req, res);
});
app.post('/getfbyid', urlencodedParser, function (req, res) {
    methods.getfbyid(req.body, req, res);
});


methods.login = function (query, request, response) {
    var user = Object.create(null);
    user.userid = query.userid;
    user.pwd = query.pwd;
    login(user, request, response);
}

methods.regist = function (query, request, response) {
    var user = Object.create(null);
    user.userid = query.userid;
    user.name = query.name;
    user.pwd = query.pwd;
    regist(user, request, response);
}

methods.addf = function (query, request, response) {
    var file = Object.create(null);
    file.name = query.name;
    file.by = query.by;
    addf(file, request, response);
}
methods.getf = function (query, request, response) {
    var file = Object.create(null);
    file.by = query.by;
    getf(file, request, response);
}
methods.delf = function (query, request, response) {
    var file = Object.create(null);
    file.id = query.id;
    delf(file, request, response);
}
methods.updatef = function (query, request, response) {
    var file = Object.create(null);
    file.id = query.id;
    file.text = query.text;
    updatef(file, request, response);
}
methods.getfbyid = function (query, request, response) {
    var file = Object.create(null);
    file.id = query.id;
    file.text = query.text;
    getfbyid(file, request, response);
}

// 终端打印如下信息
//console.log('Server running at http://127.0.0.1:8888/');
