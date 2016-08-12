var app = require('express')();
var http = require('http').Server(app);
var SyncSocket = require('syncsocket');

var srv = SyncSocket(http, { embeddedTimeserver: true });
srv.createChannel('myAudioSystem');

http.listen(3000, function(){
    console.log('listening on *:3000');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

srv.on('connection', function () {
    console.log('a new client connected');
});

srv.on('disconnect', function () {
    console.log('client disconnected');
});
