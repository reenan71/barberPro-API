import prismaClient from "../../prisma";

interface HaircutRequest {
    user_id: string;
    name: string;
    price: number;
}

export class CreateHaircutService {
    async execute({user_id, name, price}: HaircutRequest){
        if(!name || !price){
            throw new Error("Erro! Sem nome do corte ou preço")
        }

        //VERIFICAR QUANTOS MODELOS O USUARIO TEM CADASTRADO
        const qtdHaircuts = await prismaClient.haircut.count({
            where:{
                user_id: user_id,
            }
        })

        //VERIFICA SE O USUARIO É PREMIUM
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id,
            },
            include:{
                subscriptions: true,
            }
        })

        //VERIFICA SE O USUARIO TEM 3 MODELOS DE CORTES CADASTRADO E NÁO É PREMIUM
        if(user && user.subscriptions && qtdHaircuts >= 3 && user?.subscriptions.status !== 'active'){
            throw new Error("Not authorized")
        }

        const haircut = await prismaClient.haircut.create({
            data:{
                name: name,
                price: price,
                user_id: user_id
            }
        })

        return haircut;
    }
}