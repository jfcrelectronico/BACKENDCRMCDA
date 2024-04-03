// path de cliente
import { Router } from "express";
import { crearcliente, deletecliente, getClientes, getfiltroclientes, nombreactualizar, updatecliente } from "../controllers/cliente.controller";
import { check } from "express-validator";
import { validarcampo } from "../middlewares/validarcampos";
import validarJWT from "../middlewares/validar-jwt";

//path: api/v1/cliente
const router = Router();
router.post("/",
validarJWT,
[   // for use this npm -i express-validator
    // double systema validators
    check("nombre","El nombre es obligatorio pilas pues ").not().isEmpty(),
    check("telefono","El telefono es obligatorio pilas pues ").not().isEmpty(),
    check("direccion","La direccion es obligatorio pilas pues ").not().isEmpty(),
    check("email","El email es obligatorio").not().isEmpty().isEmail(),
    check("TipoDocumento","El tipo de documento es obligatorio pilas pues ").not().isEmpty(),
    check("NumeroDocumento","El numero de documento es obligatorio pilas pues ").not().isEmpty(),
    check("PlacaVehiculo","La placa del vehiculo es obligatorio pilas pues ").not().isEmpty(),
    check("TipoVehiculo","El tipo de vehiculo es obligatorio pilas pues ").not().isEmpty(),
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
,crearcliente);//ruta y controlador
//router.get("/",validarJWT,getClientes);
router.get("/",getClientes);
router.get("/:id",validarJWT,getfiltroclientes);//: id parametro de busqueda en la peticion se omiten los :
router.put("/:id",validarJWT,updatecliente);//ruta y controlador
router.delete("/:id",validarJWT,deletecliente);//ruta y controlador
router.put("/nombre/:id",validarJWT,nombreactualizar);//ruta y controlador */
export default router;// for can use in others parts of code

// si esta validarJWT se requiere token , este deberia ir en el header a traves de x-Token