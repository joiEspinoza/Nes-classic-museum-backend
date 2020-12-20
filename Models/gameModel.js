const { Schema, model } = require( "mongoose" );

//////<<<<<------------------------------------------------``

const gameSchema = Schema(

    {
        nameGame : { type : String, required : true, unique : true },

        company : { type : String, required : true },
        
        gender : { type : String, required : true },

        platform : { type : String, required : true },

        launchYear : { type : String, required : true },

        user : { type : Schema.Types.ObjectId, ref : "Usuario", required : true }

    }

);

//////---------------------------------------------->>>>>

module.exports = model( "Game", gameSchema );

