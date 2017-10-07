var apptoweb={

pushapptoWeb:function(req,res){
	var chname=req.body.channel;
	var hagda=req.body.udata;
	
var iogh = global.socketIO;
//console.log('i m app to web');

iogh.sockets.to(chname).emit('update_Ping', hagda);

 res.json(hagda);
},

pushwebtoapp:function(req, res){
var chname=req.body.channel;
	var hagda=req.body.udata;

//console.log('i m web to app');
var io = global.socketIO;
 iogh.sockets.to(chname).emit('update_Pong', hagda);
 //console.log('I m in online user fn 23');
 res.json(hagda);
},

}

module.exports=apptoweb;
