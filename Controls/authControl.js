const { response } = require( "express" );
const Usuario = require( "../Models/userModel" );
const bcryptjs = require( "bcryptjs" );

//////<<<<<------------------------------------------------``

const login = async ( request, response = response ) =>
{

   try 
   {

    //---------\\ DATOS REQUEST //---------\\ 

        const { email, password } = request.body;

    //----------------------------------\\ 


    //---------\\ BUSQUEDA USUARIO //---------\\ 

        let usuario = await Usuario.findOne( { email } );

    //-----------------------------------------\\


    //---------\\ VALIDACION EMAIL //---------\\ 

        if( !usuario )
        {
            return response.status( 400 ).json( { ok : false, msg : "Email o contraseña invalido E" } );
        };

    //-----------------------------------------\\



    //---------\\ VALIDACION PASSWORD //---------\\ 

        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if( !validPassword )
        {
            return response.status( 400 ).json( { ok : false, msg : "Email o contraseña invalido P" } );
        };

    //-----------------------------------------\\



    //---------\\ MENSAJE CONFIRMACION //---------\\ 

        return response.status( 200 ).json( { ok : true, msg : "Login", uid : usuario.id, name : usuario.name } );

    //-----------------------------------------\\
        
   } 
   catch( error ) 
   {

        console.log( error );
        response.status( 500 ).json( { ok : false, msg : "Favor de hablar con el admin" } );

   };

};


const register = async ( request, response = response ) =>
{
    try 
    {

        //---------\\ DATOS REQUEST //---------\\ 

        const { email, password } = request.body;

        //--------------------------------------\\


        //---------\\ BUSQUEDA USUARIO //---------\\ 

        let usuario = await Usuario.findOne( { email } );

        //-----------------------------------------\\



        //---------\\ VALIDACION EMAIL //---------\\ 

        if( usuario )
        {
            return response.status( 400 ).json( { ok : false, msg : "El correo de usuario ya existe" } );
        };

        //-------------------------------------------\\


        //---------\\ CREACION //----------\\ 

        usuario = new Usuario( request.body );

        //----------------------------------\\


        //---------\\ ENCRIPTACION //----------\\ 

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        //--------------------------------------\\


        //---------\\ SAVE //--------------\\ 

        await usuario.save(); 

        //----------------------------------\\


        //---------\\ MENSAJE CONFIRMACION //--------------\\ 

        response.status( 201 ).json( { ok : true, msg : "Register", uid : usuario.id, name : usuario.name } );

        //---------------------------------------------------\\

    }
    catch( error ) 
    {

        console.log( error );
        response.status( 500 ).json( { ok : false, msg : "Favor de hablar con el admin" } );

    };
};

//////---------------------------------------------->>>>>

module.exports = { login, register };