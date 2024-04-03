//structure of database
import { Model, Schema, model } from "mongoose";

const clienteSchema = new Schema({
    nombre:{type: String,required: true},
    telefono:{type: String,required: true},
    direccion:{type: String,required: true},
    email:{type: String,required: true},
    TipoDocumento:{type: String,required: true},
    NumeroDocumento:{type: String,required: true},
    PlacaVehiculo:{type: String,required: true},
    TipoVehiculo:{type: String,required: true},
    Observaciones:{type: String},
    createdAt:{type: Date,default: Date.now()},
    updateAt:{type: Date,default: Date.now()},
});

const ClienteModel : Model<any> = model("cliente",clienteSchema);

export default ClienteModel;

