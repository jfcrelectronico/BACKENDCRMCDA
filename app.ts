import dotenv from "dotenv";
import { Server } from "./src/server";

//config .env
dotenv.config();

// create object of type Server
const server = new  Server();



server.listen();
