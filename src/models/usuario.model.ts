//structure of database
import { Model, Schema, model } from "mongoose";

const usuarioSchema = new Schema({    
    nombre:{type: String,required: true},
    email:{type: String,required: true, unique : true},
    tipoDocumento:{type: String,required: true},
    numeroDocumento:{type: String,required: true, unique: true},
    login :{type: String,required: true, unique: true},
    password: {type: String,required: true},
    rol:{type: String,default: "admin"},
    estado :{type: Boolean, default: true},
    createdAt:{type: Date,default: Date.now()},    
});

const UsuarioModel : Model<any> = model("usuario",usuarioSchema);

export default UsuarioModel;

