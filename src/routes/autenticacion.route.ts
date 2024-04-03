import { check } from "express-validator";
import { validarcampo } from "../middlewares/validarcampos";
import { Router } from "express";
import { RenovarToken, actualizarPassword, login, olvidoPassword, } from "../controllers/autenticacion.controller";
import validarJWT, {validarJWTPASS } from "../middlewares/validar-jwt";


//path: api/v1/autenticacion
const router = Router();
router.post("/",
//validarJWT,
[   // for use this npm -i express-validator
    // double systema validators
    // no se usa validacion por token pues seria imposible entrar al sistema
   
    check("login","El correo de login es obligatorio pilas pues ").not().isEmpty(),
    check("password","El password es obligatorio pilas pues ").not().isEmpty(),
    validarcampo,

 /*    nombre:{type: String,required: true},
    telefono:{type: String,required: true},
    direccion:{type: String,required: true},
    email:{type: String,required: true},
    TipoDocumento:{type: String,required: true},
    NumeroDocumento:{type: String,required: true},
    PlacaVehiculo:{type: String,required: true},
    TipoVehiculo:{type: String,required: true}, */

]
,login);//ruta y controlador autenticacion
router.get("/",validarJWT,RenovarToken);
router.post("/olvidoPassword",
[
    check("login","El correo de login es obligatorio pilas pues ").not().isEmpty(),
    check("NumeroDocumento","El numero de documento es obligatorio pilas pues ").not().isEmpty(),
    validarcampo, 
],
olvidoPassword);
router.put("/actualizarPassword",
validarJWTPASS,
[
    check("password","El password es obligatorio pilas pues ").not().isEmpty(),
    validarcampo, 
],actualizarPassword);//ruta y controlador
export default router;// for can use in others parts of code