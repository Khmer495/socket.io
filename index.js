var http = require('http').createServer(handler);
var fs = require('fs')

http.listen(process.env.PORT || 3000);
function handler(req, res) {
    fs.readFile(__dirname + '/index.html', function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error');
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })
}

var io = require('socket.io')(http);

io.on('connection', function(socket){
    socket.on('emit_from_client', function(data){
        socket.join(data.room);
        socket.client_name = data.name;
        //接続しているソケットのみ
        //socket.emit
        //接続しているソケット以外全部
        //socket.broadcast.emit
        //接続しているソケット全部
        //io.sockets.emit
        //socket.emit('emit_from_server', 'In ' + data.room);
        io.sockets.to(data.room).emit('emit_from_server', '[' + data.name + '] : ' + data.msg);
    });
});
