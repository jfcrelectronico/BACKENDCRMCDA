//structure of database
import { Model, Schema, Types, model } from "mongoose";


interface ICaracteristicas{
    Procesador: string;
    MemoriaRam: string;
    Almacenamiento: string;
    Pantalla: string;
}

interface IProgramasInstalados{

    SO: string;
    Office: string;
    Antivirus: string;
    Multimedia: string;

}

interface IDistribuidor{
    Nit: string;
    RazonSocila: string;
    Telefono: string;
    Direccion: string;

}

interface IOpiniones{
    comentarios: string;
    calificacion: string;
    fecha: Date;
}

//extends Document sera dado de baja en las proximas versiones por eso No deberia ser usado
//interface IProducto extends Document{
interface IProducto {   
    Nombre: string;
    Descripcion: string;
    Precio: number;
    Categoria: string;
    Stock: number;
    CreatedAt: Date;
    Peso: string;
    IP: string;
    Estado: Boolean;

    Caracteristicas: ICaracteristicas;
    ProgramasInstalados: IProgramasInstalados;
    Distribuidor: IDistribuidor;
    Opiniones: IOpiniones;
    Usuario : Types.ObjectId;// asignar el ID del usuario que registro el producto,invocar a traves de moongose el modelo usuario

}

//el esquema debera cumplir con las especificaciones de la interfaces indicada para este caso el contenedor de interfaces IProducto
const productoSchema = new Schema <IProducto>({   
    Nombre: {type: String, required: true},
    Descripcion: {type: String},

    Precio: {type: Number, required: true},
    Categoria:{type: String,required : true}, 
    Stock: {type: Number, required: true},
    CreatedAt:{type: Date, default: Date.now()} ,
    Peso: {type: String, required: true},
    IP: {type: String},
    Estado:{type: Boolean, required: true, default: true },

    Caracteristicas: {type:Object, required: true}, // es un objeto del tipo ICaracteristicas
    ProgramasInstalados :{type:Object, required: true}, // es un objeto del tipo IProgramasInstalados
    Opiniones: {type:Object}, // es un objeto del tipo IOpiniones
    Usuario: { type: Schema.Types.ObjectId, ref:"usuario",required: true},// va a ser un esquema del tipo modelo usuario que trae el ID de dicho usuario
});

//recibe la interface IProducto se recomineda tipar el model para este caso cn la interface IProducto
const ProductoModel : Model<IProducto> = model<IProducto>("producto",productoSchema);

export default ProductoModel;