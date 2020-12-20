const express = require( "express" );
require( 'dotenv' ).config();
const cors = require('cors')
const dbConnection = require("./DataBase/dataBaseConfig");

//////<<<<<------------------------------------------------``


////////////////////// SERVIDOR //////////////////////

const appServidor = express(); 

appServidor.use( express.json() );

appServidor.use( cors() );

appServidor.listen( process.env.PORT, () => 
console.log( `Servidor corriendo en puerto ${ process.env.PORT }` ) );

///////////////////////////////////////////////////////


//---------\\ DATA BASE //---------\\ 

            dbConnection();

//----------------------------------\\ 


//------------------------------|| Rutas ||-------------------------------// 

appServidor.use( express.static( "./public" ) );

appServidor.use( "/api/auth", require( "./Routes/authRoute" ) );

appServidor.use( "/api/game", require( "./Routes/gameRoute" ) );

//------------------------------------------------------------------------// 