import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";


interface Payload{
    sub: string;
}

export function isAuthenticated(req: Request, res:Response, next: NextFunction){
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }
    //Descontruindo o TOKEN para que ele seja formatado para tirar espaço E qualquer coisa que venha antes do mesmo.
    const [, token] = authToken.split(" ")

    //VERIFICA O TOKEN DO USUARIO E PERMITE QUE ELE ACESSE A ROTA
    try{
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        req.user_id = sub;//Variavel @type/express 

        return next();

    }catch(err){
        return res.status(401).end();
    }
}