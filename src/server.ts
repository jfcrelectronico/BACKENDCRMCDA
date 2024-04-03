import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";

import rutasclientes from "./routes/cliente.route";
import rutasusuario from "./routes/usuario.route";
import rutasvalidacion from "./routes/autenticacion.route";
import rutaproducto from  "./routes/producto.route";
import cors from "cors";


// you need export class for others files can use
export class Server 
{
    private app: Application;
    private port: string;

    private miapipath ={
        cliente : "/api/v1/cliente",//contexto,versionamiento,pathcontroller
        usuario : "/api/v1/usuario",//contexto,versionamiento,pathcontroller
        validacioncredenciales: "/api/v1/autenticacion",//contexto,versionamiento,pathcontroller
        producto: "/api/v1/producto",//contexto,versionamiento,pathcontroller
    };

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "3000";
        //base de datos
        dbConnection();
        //llamado a metodos iniciales
        this.middlwares();
        //llamado a rutas
        this.routes();
        
    }

    desarrolloApi(){
        this.app.get("/",(req: Request,resp: Response)=> resp.status(200).json({msg:"Informacion"}));
    }

    middlwares(){
        //lectura del body transformar a json
        this.app.use(cors());
        this.app.use(express.json());
        this.desarrolloApi();
    }

    routes(): void{
        this.app.use(this.miapipath.cliente, rutasclientes);
        this.app.use(this.miapipath.usuario, rutasusuario);
        this.app.use(this.miapipath.validacioncredenciales,rutasvalidacion);
        this.app.use(this.miapipath.producto,rutaproducto);
    }



    listen():void{
            this.app.listen(this.port,()=>{
            console.log("servidor corriendo en el puerto: ",this.port);
            });
    }

}
// you need export class for others files can use
//export  default Server;