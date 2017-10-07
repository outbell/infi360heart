var express=require('express');
var path = require('path');
var fs = require('fs')
 var https = require('http')
//var https = require('https')
var bodyParser=require("body-parser");
//var socketioJwt = require('socketio-jwt');
var app=express();
var sslOptions = {
  key: fs.readFileSync('sslcert/server.key','utf8'),
  cert: fs.readFileSync('sslcert/server.crt','utf8'),
  }
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    //console.log('optionsf');
    res.status(200).end();
  } else {
    next();
   }
});


// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
//app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//var PORT = process.env.port || 1337;
// var HOST = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

//var PORT = 4444;
//var HOST = 'localhost';

// Start the server
app.set('port', process.env.PORT || 1337);

//var server = https.createServer(app).listen(PORT);
//var server = https.createServer(sslOptions,app).listen(443, HOST);
//console.log('HTTPS Server listening on %s:%s', HOST, PORT);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
var io = require('socket.io').listen(server);

// io.set('authorization', socketioJwt.authorize({
//   secret: secret.nodegatewaysecret,
//   handshake: true
// }));

global.socketIO = io;
    //io.join('testsockaddroom');
    //console.log('j1'); 
io.on('connection', function (socket) {
 
 // to register for continuous heartbeat , changes from John
  socket.on('pong', function(data){
       // console.log("Pong received from client");
    });
  //console.log(socket.client.request.decoded_token, 'connected');
socket.on('user_join', function(username, room_number){ 
  socket.room = room_number;
    socket.join(room_number);
    console.log('j 2:'+room_number); 
  });
  
  socket.on('site_online', function(data){ 
  var gh=JSON.parse(data);
  var hj=gh.MemberChnl;
  socket.broadcast.to(hj).emit('detectol', gh);
  });

socket.on('is_online', function(data){ 
socket.broadcast.to(data.Originchannel).emit('siteping', data);
});

socket.on('user_leave', function(room_number){ 
  socket.room = room_number;
    socket.leave(room_number);
    //console.log('j 2 l'); 
  });
  
  socket.on('disconnect', function() {
      //console.log('disconnected'); 
});
  
  
});



//require('./config/socket-io')(app, server);

//require('./config/pubnub')(app, server);

// to keep socket not sleeping
function sendHeartbeat(){
  setTimeout(sendHeartbeat, 8000);
  io.sockets.emit('ping', { beat : 1 });
}

setTimeout(sendHeartbeat, 8000);

setInterval(function(){
  //console.log('always connect');
//testfun();
},3000);


/*require('./router/main')(app);
app.set('views',__dirname + '/tst');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
var server=app.listen(3000,function(){
console.log("Express is running on port 3000");
});*/
