var express = require('express');
var bookRouter = express.Router();

var routes= function(Book){
bookRouter.route('/')
    .get(function(req,res){
        var query = {} ;
        if(req.query.genre)query.genre=req.query.genre;
        Book.find(query, function(err,books){
            if(err){
             res.status(500).send(err);
            }
            else {
                res.json(books);
            }
        })
    })
    .post(function(req,res){
        var book = new Book(req.body);
        book.save();
        res.status(201).send(book);
    });

bookRouter.use('/:bookId',function(req,res,next){
    Book.findById(req.params.bookId, function(err,book){
            if(err){
             res.status(500).send(err);
            }
            else if(book){
                req.book= book;
                next();
            } else {
                res.statusCode(404).send("no book found");
            }
        })
});

bookRouter.route('/:bookId')
    .get(function(req,res){
        res.json(req.book);
    })
    .put(function(req,res){
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.read = req.body.read;
        req.book.gener = req.body.gener;
        req.book.save();
        res.json(req.book);
    })
    .patch(function(req,res){
        if(req.body.title)req.book.title=req.body.title;
        if(req.body.author)req.book.author=req.body.author;
        if(req.body.gener)req.book.gener=req.body.gener;
        if(req.body.read)req.book.read=req.body.read;
        req.book.save();
        res.json(req.book);
    });
    return bookRouter;
}

module.exports = routes;
