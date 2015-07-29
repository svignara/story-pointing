var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/:team/team-member', function(req, res){
  res.sendFile(__dirname + '/team-member.html');
});
app.get('/:team/scrum-master', function(req, res){
  res.sendFile(__dirname + '/scrum-master.html');
});
app.get('*', function(req, res){
  res.redirect('/');
});


io.on('connection', function(socket){

  socket.on('joined team', function(team){

    socket.join(team);

    socket.on('voted', function(voteData){
      io.to(team).emit('user voted', voteData);
    });

    socket.on('reset votes', function(){
      io.to(team).emit('reset votes');
    });

  });

});



http.listen(app.get('port'), function(){
  console.log('node app running on port', app.get('port'));
});