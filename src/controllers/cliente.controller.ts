//structure of CRUD

import { Request, Response } from "express";
import ClienteModel from "../models/cliente.model";

export const crearcliente = async (req: Request, resp: Response)=>{
    const {body} = req;

    try
    {
        console.log(req);
        console.log(body);

        // se debe definir la estructura de datos antes de enviar a la base
        const clienteNuevo = new ClienteModel(body);
        //se usa el metodo save para guardar el registro en la base
        const clienteCreado = await clienteNuevo.save();

        resp.status(200).json({
        ok: true,
        msg: "Cliente registrado",
        cliente: clienteCreado,
        });






/* 
        const clienteNuevo = new ClienteModel(body);

        const clientecreado = await clienteNuevo.save();
    
        resp.status(200).json({
            ok: true,
           //add sweet alert for the final application
            msg: "Cliente creado",
            cliente : clienteNuevo,
        }); */
    }
    catch (error)
    {
        console.log(error);
        resp.status(400).json({
            ok: false,
           //add sweet alert for the final application
            msg: "Error al crear el cliente",
        });
    }
};

export const getClientes = async (req: Request, resp : Response) => {

    try{
            const clientes = await ClienteModel.find();
            resp.status(200).json({
                ok: true,
                msg: "Clientes en base",
                clientes,
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

export const getfiltroclientes = async (req: Request, resp : Response) => {

    try{

        const id = req.params.id;
        
            const clienteencontrado = await ClienteModel.findById({_id:id});
            resp.status(200).json({
                ok: true,
                msg: "Cliente con id: " + id,
                clienteencontrado,
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

export const updatecliente = async (req: Request, resp : Response) => {

    try{

        const id = req.params.id;
        //const bodystructure = req.body;
        const {body} = req;
        //body.updateAt = Date.now;


            // id por el cual busco al clienbte, la info a asignar, retorne la informacion actualizada
            //para la actualizacion  solo se podria enviar el dato a actualizar no se requiere todo el cuerpo
            const clienteactualizado = await ClienteModel.findByIdAndUpdate(id,body);
            resp.status(200).json({
                ok: true,
                msg: "Cliente con id: " + id + " fue actualizado",
                clienteactualizado,
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

export const deletecliente = async (req: Request, resp : Response) => {

    try{

        const id = req.params.id;
        //const bodystructure = req.body;
        const {body} = req;
        //body.updateAt = Date.now;


            // id por el cual busco al clienbte, la info a asignar, retorne la informacion actualizada
            //para la actualizacion  solo se podria enviar el dato a actualizar no se requiere todo el cuerpo
            const clienteeliminado = await ClienteModel.findByIdAndDelete(id);
            resp.status(200).json({
                ok: true,
                msg: "Cliente con id: " + id + " fue eliminado",
                clienteeliminado,
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

export const nombreactualizar = async (req: Request, resp : Response) => {

    try{

        const id = req.params.id;
        //const bodystructure = req.body;
        //const nombre = req.params.nombre;
        //body.updateAt = Date.now;


            // id por el cual busco al clienbte, la info a asignar, retorne la informacion actualizada
            //para la actualizacion  solo se podria enviar el dato a actualizar no se requiere todo el cuerpo
            // se debe indicar el campo a actualizar para este caso nombre
            const clienteactualizadonombre = await ClienteModel.findByIdAndUpdate(id,{nombre : "jony"});
            resp.status(200).json({
                ok: true,
                msg: "Al cliente con id: " + id + " se le actualizo el nombre",
                clienteactualizadonombre,
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

