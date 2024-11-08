"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    //Descontruindo o TOKEN para que ele seja formatado para tirar espaço E qualquer coisa que venha antes do mesmo.
    const [, token] = authToken.split(" ");
    //VERIFICA O TOKEN DO USUARIO E PERMITE QUE ELE ACESSE A ROTA
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.user_id = sub; //Variavel @type/express 
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
