

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8181 });
connect = {};
cun = {};

wss.on('connection', function (ws) {

    ws.send('你是第' + wss.clients.length + '位');

    ws.on('message', function (json) {
        var msg = JSON.parse(json);
        if (msg.type == "connect") {
            var map = {};
            map[msg.name] = ws;
            connect[msg.flname] = map;

            if (cun[msg.flname] == null) {
          /*      Filex filex = new Filex();
                filebean fl = filex.selectByID(msg.getString("flname"));*/
                if (fl != null) {
                    var json = {};
                    json.msg = fl.getPath();
                    json.type = "textc";
                    json.flname = msg.ssname;
                    ws.send(JSON.stringify(json));
                }
                cun[msg.flname] = fl.getPath();
            } else {
                var json = {};
                json.msg = fl.getPath();
                json.type = "textc";
                json.flname = msg.ssname;
                ws.send(JSON.stringify(json));
            }
        }
    });

    ws.on('close', function (close) {
        try {
            wss.broadcast(0, this.user.name);
        } catch (e) {
            console.log('刷新页面了');
        }
    });
}); 