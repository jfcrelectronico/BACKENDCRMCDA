import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.model";

import bcrypt from "bcryptjs"
import generarJWT from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validar-jwt";




export const  login = async(req: Request,resp: Response)=>
{
    const{login:loginUser,password} = req.body;

    try{
        //verificar el login

        const usuario = await UsuarioModel.findOne({login: loginUser});

        if(!usuario)
        {
            return resp.status(401).json({
                ok: false,
                msg: "Las credenciales no son validas"

            });
        }

        const validarpassword = bcrypt.compareSync(password,usuario.password)

        if(!validarpassword)
        {
            return resp.status(401).json({
                ok: false,
                msg: "Las credenciales no son validas"
            });
        }

        console.log(usuario);

    const token = await generarJWT(usuario._id,usuario.login);

        resp.status(200).json({
            ok: true,
            usuario: usuario,
           token,
        });
    }
    catch(error){
        resp.status(400).json({
            ok: false,
            error,
            msg: "Hable con el administrador"
        });

    }
};

export const RenovarToken = async (req: CustomRequest, resp: Response)=>{
    const id = req._id;
    try{
        if(typeof id ==="undefined"){
            throw new Error("NO existe id");
        }
        const usuario = await UsuarioModel.findById(id);
        //generar token nuevamente
        const token = await generarJWT(id.toString());

        resp.json({
            ok: true,
            token,
            usuario,
        });
    }catch(error){
        console.log(error);
        resp.status(401).json({
            ok: false,
            error,
            msg: "Hable con el administrador",
        });
    }

};


export const olvidoPassword = async (req: Request, resp: Response)=>{

    let token;
    const{login:loginUser,NumeroDocumento:numeroDocumento} = req.body;

    try{
        //verificar el login

        const usuarioExiste = await UsuarioModel.findOne({login: loginUser,NumeroDocumento: numeroDocumento});

        if(!usuarioExiste)
        {
            return resp.status(401).json({
                ok: false,
                msg: "Las credenciales no son validas"

            });
        }

      

        console.log(usuarioExiste);

        
        token = await generarJWT(usuarioExiste._id,usuarioExiste.login,process.env.JWT_SECRET_CHANGEPASS);
        

        resp.status(200).json({
            ok: true,
            usuario: usuarioExiste,
           token,
        });
    }
    catch(error){
        resp.status(400).json({
            ok: false,
            error,
            msg: "Hable con el administrador"
        });

    }

};

export const actualizarPassword = async (req: CustomRequest, resp: Response)=>{

    const id = req._id;
    //const {body} = req;
    const {password} = req.body;
     try{
            // id por el cual busco al clienbte, la info a asignar, retorne la informacion actualizada
            //para la actualizacion  solo se podria enviar el dato a actualizar no se requiere todo el cuerpo
            
           /*  const usuarioActualizar = new UsuarioModel({
                //Desestructure el body que esta recibiendo
                ...body,
            }); */
          
            //const iteraciones = bcrypt.genSaltSync(10);    
           
    
           /*  usuarioActualizar.password = bcrypt.hashSync(body.password, 10); */


          /*  if(!password)
           {
            resp.status(400).json({
                ok: false,
                //add sweet alert for the final application
                msg: "Digite una contraseña valida",
            });


           } */
           const  newpassword = bcrypt.hashSync(password, 10);
           
            // id por el cual busco al clienbte, la info a asignar, retorne la informacion actualizada
            //para la actualizacion  solo se podria enviar el dato a actualizar no se requiere todo el cuerpo
            // se debe indicar el campo a actualizar para este caso password
            
            /* const passwordActualizado = await UsuarioModel.findByIdAndUpdate(id,{password: usuarioActualizar.password}); */
            const passwordActualizado = await UsuarioModel.findByIdAndUpdate(id,{password: newpassword});
            resp.status(200).json({
                ok: true,
                msg: "Usuario con id: " + id + " fue actualizado",
                passwordActualizado,
            }
                
            );

    }
    catch(error)
    {
        console.log(error);
        resp.status(400).json({
            ok: false,
            //add sweet alert for the final application
            msg: "Error al actualizar password",
        });
    


    }
 



};