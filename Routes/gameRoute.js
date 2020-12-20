const { Router } = require( "express" );
const router = Router();

const { check } = require("express-validator");
const { ValidatorMidd } = require("../Middleware/validadorDatos");

const { registerGame, getGames, updateGame, deleteGame } = require("../Controls/gameControl");

//////<<<<<------------------------------------------------``

router.post(
    
    "/register", 
    [ 
        check( "nameGame","Nombre es requerido | Al menos debe contener 4 caracteres" ).isLength( { min : 4 } ),
        check( "company", "Compañia es requerida" ).not().isEmpty(),
        check( "gender", "Genero es requerido" ).not().isEmpty(),
        check( "platform","Plataforma es requerida" ).not().isEmpty(),
        check( "launchYear","Año lanzamiento requerido" ).not().isEmpty(),
        ValidatorMidd
    ], 
    registerGame
);

router.get( "/get", [], getGames );

router.put( "/:id", [], updateGame );

router.delete( "/:id", [], deleteGame );
 
//////---------------------------------------------->>>>>

module.exports = router;