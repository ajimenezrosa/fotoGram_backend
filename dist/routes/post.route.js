"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const post_model_1 = require("../models/post.model");
const file_System_1 = __importDefault(require("../classes/file-System"));
const postRouts = express_1.Router();
const fileSyetem = new file_System_1.default();
//Obtener Post paginados
postRouts.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*En mongo al colocar el .sort({ _id: -1}) le Estoy indicando que
        ordene el resultado de forma descendente...bundleRenderer.renderToStream
  
    */
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const posts = yield post_model_1.Post.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        posts
    });
}));
//Crear POST
postRouts.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    post_model_1.Post.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            body: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
//Servicios para subir Archivos
postRouts.post('/upload', [autenticacion_1.verificaToken], (req, res) => {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo'
        });
    }
    const file = req.files.image;
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que se Subio no es una Imagen'
        });
    }
    fileSyetem.guardarImagenTemporal(file, req.usuario._id);
    res.json({
        ok: false,
        file: file.mimetype
    });
});
exports.default = postRouts;
