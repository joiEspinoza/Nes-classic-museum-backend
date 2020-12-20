const { response } = require( "express" );
const Game = require( "../Models/gameModel" );

//////<<<<<------------------------------------------------``

const registerGame = async( request, response = response ) =>
{

    try 
    {
        const { nameGame } = request.body;

        //////////////////////////////

        let game = await Game.findOne( { nameGame } );

        //////////////////////////////

        if( game )
        {
            return response.status( 400 ).json( { ok : false, msg : "El juego ya existe" } );
        };

        ////////////////////////////////

        game = new Game( request.body );

        ///////////////////////////////////

        await game.save(); 

        ///////////////////////////////////


        response.status( 201 ).json( { ok : true, msg : "Game Register", ...request.body } );
        
    } 
    catch( error ) 
    {
        console.log( error );
        response.status( 500 ).json( { ok : false, msg : "Favor de hablar con el admin" } );
  
    };

};

const getGames = async ( request, response = response ) =>
{
    try 
    {
        //////////////////

        const games = await Game.find().populate("user","_id");

        //////////////////

        return response.status( 200 ).json( { ok : true, msg : "Game get", games } );

    } 
    catch( error ) 
    {

        console.log( error );

        return response.status( 500 ).json( { ok : false, msg : "favor de contactar al admin" } );

    };
};

const updateGame = async ( request, response = response ) =>
{
    try 
    {
        const gameId = request.params.id;

        ///////////

        let game = await Game.findById( gameId );

        ///////////
        
        if( !game )
        {
            return response.status( 400 ).json( { ok : false, msg : "Juego no encontrado" } );
        };

        /////////////////

        const newGame = { ...request.body };

        /////////////////

        const gameUpdated = await Game.findByIdAndUpdate( gameId, newGame, { new : true } );

        /////////////////

        return response.status( 200 ).json( { ok : true, msg : "Game update", game : gameUpdated } );

    }
    catch( error ) 
    {

        console.log( error );

        return response.status( 500 ).json( { ok : false, msg : "favor de contactar al admin" } );

    };
};

const deleteGame = async ( request, response = response ) =>
{
   
    try 
    {
        const gameid = request.params.id;

        let game = await Game.findByIdAndDelete( gameid );

        if( !game )
        {
            return response.status( 400 ).json( { ok : false, msg : "Juego no encontrado" } );
        };

        return response.status( 200 ).json( { ok : true, msg : "Game delete" } );

    } 
    catch( error ) 
    {

        console.log( error );

        return response.status( 500 ).json( { ok : false, msg : "favor de contactar al admin" } );

    };
};

//////---------------------------------------------->>>>>

module.exports = { registerGame, getGames, updateGame, deleteGame };