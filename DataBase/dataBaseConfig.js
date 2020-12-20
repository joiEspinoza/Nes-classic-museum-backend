const mongoose = require( "mongoose" );

//////<<<<<------------------------------------------------``

const dbConnection = async () =>
{
    try 
    {

        await mongoose.connect( 
            
            process.env.DB_CONNECTION,
            { 
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex : true
            }
            
        );

        mongoose.set('useFindAndModify', false);

        console.log( "DB Online" );

    } 
    catch( error ) 
    {

        console.log( error );  
        throw new Error( "error al inicializar la base de datos" );

    };
};

//////---------------------------------------------->>>>>

module.exports = dbConnection;