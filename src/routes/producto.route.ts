import { check } from "express-validator";
import validarJWT from "../middlewares/validar-jwt";
import { validarcampo } from "../middlewares/validarcampos";
import { Router } from "express";
import { crearProducto, getProductos } from "../controllers/producto.controller";

const router = Router();
router.post("/",validarJWT,
[   // for use this npm -i express-validator
    // double systema validators
    check("Nombre","El nombre es obligatorio pilas pues ").not().isEmpty(),
    check("Precio","El precio es obligatorio pilas pues ").not().isEmpty(),
    check("Categoria","La categoria es obligatoria pilas pues ").not().isEmpty(),
    validarcampo,


]
,crearProducto);//ruta y controlador
router.get("/",validarJWT,getProductos);
export default router;// for can use in others parts of code
