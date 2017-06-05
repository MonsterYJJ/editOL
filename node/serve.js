var http = require('http');

var methods = {};

http.createServer(function (request, response) {

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	function respond(code,body,type){
		if(!type)type = "text/plain";
		response.writeHead(code,{"Content-Type":type});
		if(body&&body.pipe)
		body.pipe(response);
		else
		response.end(body);
	}
    var method = request.method;
	if(method in methods)
	methods[method]()
	// 发送响应数据 "Hello World"
	response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');