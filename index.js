var express = require( "express" );
var path = require( "path" );
var cors = require( "cors" );
var bodyParser = require( "body-parser" );
var MongoClient  = require( "mongodb" ).MongoClient;
var app = express();
require( "dotenv" ).config();
var router = require( "./api/router.js" );
var port = process.env.PORT || 8000;
var db;

app.use( cors() );
app.use( express.static( __dirname ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { "extended": true } ) );

// Force into HTTPS if production
if( app.get( "env" ) === "production" ){
    app.use(function(req, res, next) {
        var protocol = req.get('x-forwarded-proto');

        protocol == "https" ? next() : res.redirect( "https://" + req.hostname + req.url );
    } );
}

MongoClient.connect( process.env.MONGODB_URI, function mongoConnect( error, database ){
    if( error ){
        // Use fail.html
        app.get( "*", function getAll( request, response ){
            response.sendFile( path.resolve( "./fail.html" ) );
        } );

        console.log( "DATABASE ERROR", error );
    }
    else{
        db = database.db( process.env.DB_NAME );

        router( app, db );

        // Use index.html
        app.get( "*", function getAll( request, response ){
            response.sendFile( path.resolve( "./index.html" ) );
        } );

        app.listen( port );

        console.log( "listening to port:", port );
    }
} );
