import { check } from "express-validator";
import { crearUsuario, deleteUsuario, getUnUsuario, getUsuarios, updateUsuario } from "../controllers/usuario.controller";
import { Router } from "express";
import { validarcampo } from "../middlewares/validarcampos";
import validarJWT from "../middlewares/validar-jwt";

//path: api/v1/usuario
const router = Router();
router.post("/",
[   // for use this npm -i express-validator
    // double systema validators
    check("nombre","El nombre es obligatorio pilas pues ").not().isEmpty(),
    check("email","El email es obligatorio").not().isEmpty().isEmail(),
    check("tipoDocumento","El tipo de documento es obligatorio pilas pues ").not().isEmpty(),
    check("numeroDocumento","El numero de documento es obligatorio pilas pues ").not().isEmpty(),
    check("login","El numero de documento es obligatorio pilas pues ").not().isEmpty(),
    check("password","El numero de documento es obligatorio pilas pues ").not().isEmpty(),
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
,crearUsuario);//ruta y controlador

router.get("/",getUsuarios);
router.get("/:id",validarJWT,getUnUsuario);//: id parametro de busqueda en la peticion se omiten los :
router.put("/:id",validarJWT,updateUsuario);//ruta y controlador
router.delete("/:id",validarJWT,deleteUsuario);//ruta y controlador

export default router;// for can use in others parts of code