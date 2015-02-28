var express = require('express');
var app = express();
var server = app.listen(80);
var bodyParser = require('body-parser');
var tr = require('traceroute');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.locals.basedir = __dirname;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res, next) {
	res.render('index');
});
app.use('/app', express.static(__dirname + '/app'));
app.use('/bower', express.static(__dirname + '/bower_components'));
app.get('/partials/:id', function(req, res, next) {
  var name = req.params.id;
  res.render('partials/' + name);
});
app.post('/tr', function(req, res, next) {
  var q = req.body.q || '';
  if(typeof req.body.q === 'undefined') return res.status(400).send('Bad request!');
  function traceCallback(err, hop) {
    if(err) {
      res.json(err);
      return;
    }
    return res.json(hop);
  }
  q = (!q.length) ? req.connection.remoteAddress : q.replace(/^https?\:\/\//, '');
  tr.trace(q, traceCallback);
});
