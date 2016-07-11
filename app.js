var http =require('http');
var express = require('express');
var path =require('path');

var app =express();
app.set('view engine', 'jade');

//where to find the view files

app.set('views', './views');

app.use(express.static('./public'));

// A route for the home page - will render a view
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/slot.html'));
});
// app.get('/slot', function(req, res) {
//   res.sendFile(path.join(__dirname + '/views/slot.html'));
// });
// A route for /say-hello - will render a view


http.createServer(app).listen(3000,function(){
  console.log('express app strated');
});

