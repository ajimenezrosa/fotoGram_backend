"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRourtes = express_1.Router();
userRourtes.get('/prueba', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo esto Funciona bien!'
    });
});
exports.default = userRourtes;
