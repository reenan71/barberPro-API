import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserRequest{
    email: string;
    password: string;
}

export class AuthUserService{
    async execute({email, password}: AuthUserRequest){
        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
            include:{
                subscriptions: true,
            }
        })

        if(!user) {
            throw new Error("Email ou senha incorretos")
        }

        //Compara a senha que está sendo digitada com a senha salva no DB
        const passwordMatch = await compare(password, user?.password);

        if(!passwordMatch){
            throw new Error("Email ou senha incorretos")
        }

        //GERAR TOKEN AO LOGAR
        const token = sign(
            {
            name: user.name,
            email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d' //TOKEN EXPIRA EM 30 DIAS
            }
        )
        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            endereco: user?.endereco,
            token: token,
            subscriptions: user.subscriptions ? {//VERIFICA SE O USUARIO TEM INSCRIÇAO PREMIUM ATIVA
                id: user?.subscriptions.id,
                status: user?.subscriptions.status
            } : null
        }
    }
}