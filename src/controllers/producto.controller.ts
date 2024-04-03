import { CustomRequest } from "../middlewares/validar-jwt";
import ProductoModel from "../models/producto,model";
import { Request,Response } from "express";

// para taer interface desde otro componete en el request se usa CustomRequest

export const crearProducto = async (req: CustomRequest, resp: Response)=>{
   
    const {body} = req;
    const id = req._id;// al usar Customrequest se pueden traer datos desde otros componentes 
    
    console.log(id);
   
    try
    {
       
        const ProductoNuevo = new ProductoModel ({Usuario: id, ...body});//se le asigna a usuario el id captura desde el registro en la base de datos para poder interactuar con el sistema a traves de los token y se desestructura el ...body
     
        const ProductoCreado = await ProductoNuevo.save();
       


        resp.status(200).json({
            ok: true,
            msg: "Producto creado satisfactoriamente",
            ProductoCreado,

        });



        

    }catch(error)
    {

        console.error(error);
        resp.status(400).json({
            ok: false,
            error,
            msg: "Error al crear crear el producto",
        });

    }
    
    
        
};

export const getProductos = async (req:Request, resp: Response) =>{

    //permite regresar todo el listado de productos creados incluido los datos del usuario que lo creo
    try
    {   //populate permite traer datos a traves de la relacion que ya se creo entre el modelo producto y el modelo usuario, se le indica el path que para este caso es usuario, y se le establecen
        //los campos que se desean traer de dicha relacion
        const Productos = await ProductoModel.find().populate({path : "usuario",select: "Nombre,NumeroDocumento,email"});

        resp.json({
            ok: true,
            Productos,
        });

    }
    catch(error)
    {
        resp.status(400).json({
            ok: false,
            error,
        });


    }


};