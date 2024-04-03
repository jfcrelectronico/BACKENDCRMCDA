import mongoose from "mongoose";

export const dbConnection = async () =>{
    try{

        const dbUrl = process.env.DB_CONNECTION;

        if(!dbUrl)
        {
            throw new Error("Error en la conexion");
        }

        await mongoose.connect(dbUrl);
        console.log("DB online");
    }
    catch (error)
    {
        console.log("Error en la conexion base de datos : " + error);
    }
}