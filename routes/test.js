module.exports = function(app,io){
  app.post('/test', function(req, res){
    //I would like here be able to send to all clients in room "test"
    //console.log('withg');
    io.sockets.on('connection', function (socket) {
socket.room='test';
socket.join('test');
//console.log('i am joined');
    });
    res.json({
        "status": 200,
        "message": "ok"
      });
      return;
  });

app.post('/sockconn', function(req, res){
    //I would like here be able to send to all clients in room "test"
    //console.log('withg');
    var message="sdfdf"
    io.sockets.on('connection', function (socket) {
socket.broadcast.to('test').emit('update_chat',message);

    });
    res.json({
        "status": 200,
        "message": "ok"
      });
      return;
  });

};
