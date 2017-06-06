var http = require('http');
var url = require("url");
var path = require("path"); 
var express  = require("express"); 
var session = require('express-session');
var cookieParser = require('cookie-parser');
var login = require("./lg");

var app = express();
app.use(cookieParser());
app.use(session({
     secret: '12345',
     name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
     cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
     resave: false,
     saveUninitialized: true,
 }));

var methods = Object.create(null);

var server = app.listen(8888, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
});

app.get('/', function (req, res) {
	res.render("ok");
});

app.get('/login', function (req, res) {
	methods.login(req.query,req,res)
});
app.post('/login', function (req, res) {
	methods.login(req.body,req,res)
});

app.get('/regist', function (req, res) {
	methods.regist(req.query,req,res)
});
app.post('/regist', function (req, res) {
	methods.regist(req.body,req,res)
});

methods.login = function(query,request,response){
	var user = Object.create(null);
	user.userid = query.userid;
	user.pwd = query.pwd;
	login(user,request,response);
}

methods.regist = function(query,request,response){
	var user = Object.create(null);
	user.userid = query.userid;
	user.pwd = query.pwd;
	login(user,request,response);
}
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');