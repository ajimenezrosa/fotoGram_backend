"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() {
    }
    guardarImagenTemporal(file, userId) {
        //Creacion carpetas
        const path = this.crearCarpetausuario(userId);
        //nombre archivo
        const nombreArchivo = this.generarNombreUnico(file.name);
        console.log(file.name);
        console.log(nombreArchivo);
    }
    generarNombreUnico(nombreOriginal) {
        // images.jpg
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid_1.default();
        return `${idUnico}.${extension}`;
    }
    crearCarpetausuario(userid) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userid);
        const pathuserTemp = pathUser + '/temp';
        // console.log(pathUser);
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathuserTemp);
        }
        return pathuserTemp;
    }
}
exports.default = FileSystem;
