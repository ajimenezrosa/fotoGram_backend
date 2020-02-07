"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const server = new server_1.default();
//Rutas de mi aplicacion
server.app.use('/user', usuarios_1.default);
//Levantar Express
server.start(() => {
    console.log(`Servidor Corriendo en Puerto ${server.port} `);
});
