import { Request,Response } from "express";
import UsuarioModel from "../models/usuario.model";

import bcrypt from "bcryptjs";

export const getUsuarios = async (req: Request, resp : Response) => {

    try{
            const usuarios = await UsuarioModel.find();
            resp.status(200).json({
                ok: true,
                msg: "Usuarios en base",
                usuarios,
            }
                
            );

    }
    catch(error)
    {
        console.log(error);
        resp.status(400).json({
            ok: false,
            //add sweet alert for the final application
            msg: "Error al consultar los clientes",
        });
    


    }


};

export const getUnUsuario = async (req: Request, resp : Response) => {

    try{

        const id = req.params.id;
        
            const usuarioencontrado = await UsuarioModel.findById({_id:id});
            resp.status(200).json({
                ok: true,
                msg: "Usuario con id: " + id,
                usuarioencontrado,
            }
                
            );

    }
    catch(error)
    {
        console.log(error);
        resp.status(400).json({
            ok: false,
            //add sweet alert for the final application
            msg: "Error al consultar los usuarios",
        });
    


    }



};

export const updateUsuario= async (req: Request, resp : Response) => {

    try{

        const id = req.params.id;
        //const bodystructure = req.body;
        const {body} = req;
        //body.updateAt = Date.now;


            // id por el cual busco al clienbte, la info a asignar, retorne la informacion actualizada
            //para la actualizacion  solo se podria enviar el dato a actualizar no se requiere todo el cuerpo
            const usuarioactualizado = await UsuarioModel.findByIdAndUpdate(id,body);
            resp.status(200).json({
                ok: true,
                msg: "Usuario con id: " + id + " fue actualizado",
                usuarioactualizado,
            }
                
            );

    }
    catch(error)
    {
        console.log(error);
        resp.status(400).json({
            ok: false,
            //add sweet alert for the final application
            msg: "Error al consultar los usuarios",
        });
    


    }


};

export const deleteUsuario = async (req: Request, resp : Response) => {

    try{

        const id = req.params.id;
        //const bodystructure = req.body;
        const {body} = req;
        //body.updateAt = Date.now;


            // id por el cual busco al clienbte, la info a asignar, retorne la informacion actualizada
            //para la actualizacion  solo se podria enviar el dato a actualizar no se requiere todo el cuerpo
            const usuarioeliminado = await UsuarioModel.findByIdAndDelete(id);
            resp.status(200).json({
                ok: true,
                msg: "Usuario con id: " + id + " fue eliminado",
                usuarioeliminado,
            }
                
            );

    }
    catch(error)
    {
        console.log(error);
        resp.status(400).json({
            ok: false,
            //add sweet alert for the final application
            msg: "Error al consultar los usuarios",
        });
    


    }


};










export const crearUsuario = async (req: Request, resp: Response)=>{
    const {body} = req;
    try{
        const existeLogin = await UsuarioModel.findOne({
            login: body.login,
        });

        if (existeLogin)
        {
            return resp.status(409).json({
                ok: false,
                msg: `Ya existe un login ${body.login} creado`,

            });
        }

        const existeDocumento = await UsuarioModel.findOne({
            numeroDocumento: body.numeroDocumento,
        });

        if (existeDocumento)
        {
            return resp.status(409).json({
                ok: false,
                msg: `Ya existe un documento ${body.numeroDocumento} creado`,

            });
        }

    
        const newUsuario = new UsuarioModel({
            //Desestructure el body que esta recibiendo
            ...body,
        });
      
        const iteraciones = bcrypt.genSaltSync(10);    

        newUsuario.password = bcrypt.hashSync(body.password, iteraciones);

        const usuarioCreado = await newUsuario.save();

        resp.status(200).json({
            ok: true,
            msg: "Usuario Creado con exito",
            usuarioCreado,
        });

        


    }catch (error)
    {
        console.error(error);
        resp.status(400).json({
            ok: false,
            error,
            msg: "Error al crear el usuario, comuniquese con el administrador del sistema",
        });

    }

};

