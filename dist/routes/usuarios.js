"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRourtes = express_1.Router();
//Login
userRourtes.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'usuario / contrasena no son conrrectos'
            });
        }
        if (userDB.comprarPassword(body.password)) {
            res.json({
                ok: true,
                token: '#LJA;FLKJASDFLKJASDFFLJKA'
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'usuario / contrasena no son conrrectos ***'
            });
        }
    });
    ////
});
//Crear un usuario
userRourtes.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };
    usuario_model_1.Usuario.create(user).then(userDB => {
        res.json({
            ok: true,
            user: userDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = userRourtes;
