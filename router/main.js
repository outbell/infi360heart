module.exports=function(app)
{
app.get('/',function(req,res){
res.render('index.html')
});
app.get('/about',function(req,res){
res.render('about.html');
});
app.get('/logout',function(req,res){
       res.json({"logout":"yes"});
});
app.post('/login',function(req,res){
  var user_name=req.user;
  var password=req.password;
  //console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});
}
