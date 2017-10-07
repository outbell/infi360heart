module.exports = function(app, server) {
	//console.log('Express server listening socket on port ' + server.address().port);
	var socketIO = require('socket.io').listen(server);
	global.socketIO = socketIO;

	//socketIO.set("transports", ["xhr-polling"]);
	socketIO.sockets.on('connection', function (socket) {

	  socket.on('disconnect', function () {
	  });

	});

}