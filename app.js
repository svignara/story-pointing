var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/:team/vote', function(req, res){
  res.sendFile(__dirname + '/vote.html');
});
app.get('/:team/results', function(req, res){
  res.sendFile(__dirname + '/results.html');
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



http.listen(3000, function(){
  console.log('listening on *:3000');
});