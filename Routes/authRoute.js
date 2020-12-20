const { Router } = require( "express" );
const router = Router();

const { check } = require("express-validator");
const { ValidatorMidd } = require("../Middleware/validadorDatos");

const { login, register } = require( "../Controls/authControl" );


//////<<<<<------------------------------------------------``

router.post( 
    
    "/",
    [
        check( "email", "Email es requerido" ).isEmail(),
        check( "password", "Password requerido - debe contener al menos 6 caracteres" ).isLength( { min : 6 } ),
        ValidatorMidd
        
    ], 
    login 

);

router.post( 
    
    "/register",
    [
        check( "name", "Nombre es requerido" ).not().isEmpty(),
        check( "email", "Email es requerido" ).isEmail(),
        check( "password", "Password debe tener minimo 6 caracteres" ).isLength( { min : 6 } ),
        ValidatorMidd
    ], 
    register 

);

//////---------------------------------------------->>>>>

module.exports = router;

