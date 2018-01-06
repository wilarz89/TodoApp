// dependencies
   var express  = require('express');
   var app      = express();
   var mongoose = require('mongoose');
   var morgan = require('morgan');
   var bodyParser = require('body-parser');
   var methodOverride = require('method-override');
   var bodyParser = require('body-parser');
    var methodOverride = require('method-override');
    var database = require('./config/database');
    var port     = process.env.PORT || 8888;

   // configuration =================

  mongoose.connect(database.url);

   app.use(express.static(__dirname + '/public'));
   app.use(morgan('dev'));
   app.use(bodyParser.urlencoded({'extended':'true'}));
   app.use(bodyParser.json());
   app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
   app.use(methodOverride());


   app.listen(8888);
   console.log("App listening on port 8888");
   // routes ======================================================================

       // api ---------------------------------------------------------------------
       // get all todos
       app.get('/api/todos', function(req, res) {

           // use mongoose to get all todos in the database
           Todo.find(function(err, todos) {

               // if there is an error retrieving, send the error. nothing after res.send(err) will execute
               if (err)
                   res.send(err)

               res.json(todos); // return all todos in JSON format
           });
       });

       // create todo and send back all todos after creation
       app.post('/api/todos', function(req, res) {

           // create a todo, information comes from AJAX request from Angular
           Todo.create({
               text : req.body.text,
               done : false
           }, function(err, todo) {
               if (err)
                   res.send(err);

               // get and return all the todos after you create another
               Todo.find(function(err, todos) {
                   if (err)
                       res.send(err)
                   res.json(todos);
               });
           });

       });

       // delete a todo
       app.delete('/api/todos/:todo_id', function(req, res) {
           Todo.remove({
               _id : req.params.todo_id
           }, function(err, todo) {
               if (err)
                   res.send(err);

               // get and return all the todos after you create another
               Todo.find(function(err, todos) {
                   if (err)
                       res.send(err)
                   res.json(todos);
               });
           });
       });
