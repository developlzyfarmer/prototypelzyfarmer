var express = require( "express" );
var path = require( "path" );
var bodyParser = require( "body-parser" );
var mongodb = require( "mongodb" );
var app = express();
var port = process.env.PORT || 8080;
var db;

app.use( express.static( __dirname ) );
app.use( bodyParser.json() );

// Routes
app.get( "*", function getAll( request, response ){
    response.sendFile( path.resolve( "./index.html" ) );
} );

console.log( "MONGODB_URI", process.env.MONGODB_URI );

mongodb.MongoClient.connect( process.env.MONGODB_URI || "mongodb://localhost:27017/test", function mongoClientConnect( err, database ){
  if( err ){
    console.log( "err", err );
    process.exit( 1 );
  }

  // Save database object from the callback for reuse.
  db = database.db();
  console.log( "Database connection ready" );

  // Setup
  app.listen( port );
} );
