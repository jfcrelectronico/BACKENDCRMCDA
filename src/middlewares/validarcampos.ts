// son funciones que se ejecutan antes de ir al controlador/
//con ello si se tienen errores no se hace las peticiones a la base

import { NextFunction , Request, Response } from "express";
import { validationResult } from "express-validator";

export const validarcampo =(req: Request , resp : Response , next: NextFunction)=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return resp.status(400).json(
            {
                ok: false,
                errores: errores.mapped(),
            }
        );
    }
    next();
}