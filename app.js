var express = require('express');
var mangoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var db = mangoose.connect('mongodb://localhost/bookAPI');
var port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var Book = require('./models/book');
var bookRouter = require('./routes/bookRoutes')(Book);
app.use('/api/books',bookRouter);

app.get('/',function(req,res){
    res.send("Welcome to My API.");
});

app.listen(port,function(){
    console.log("server listening on port : "+ port);
})