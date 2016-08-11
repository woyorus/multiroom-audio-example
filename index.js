var app = require('express')();
var http = require('http').Server(app);
var SyncSocket = require('syncsocket');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/syncsocket-client.js', function (req, res) {
    res.sendFile(__dirname + '/node_modules/syncsocket-client/syncsocket.js')
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var syncsocketSrv = SyncSocket();
syncsocketSrv.createChannel({ channelId: 'myAudioSystem' });
syncsocketSrv.listen(6024);

syncsocketSrv.on('connection', function () {
    console.log('a new client connected');
});

syncsocketSrv.on('disconnect', function () {
    console.log('client disconnected');
});
