import prismaClient from "../../prisma";
import { hash } from "bcryptjs" //Biblioteca para criptografar senhas

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

export class CreateUserService {
    async execute({name, email, password}: UserRequest){
        if(!email){//Se não tiver email preenchido, apresenta esse erro
            throw new Error("Email incorreto");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({//Faz uma busca no DB para encontar o email
            where:{
                email: email
            }
        });

        if(userAlreadyExists){//Se encontrar email igual, irá apresentar esse erro.
            throw new Error("Email ou Usuario já está cadastrado");
        }

        const passwordHash = await hash(password, 8)//Faz com que a senha seja criptografada

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return user;
    }
}