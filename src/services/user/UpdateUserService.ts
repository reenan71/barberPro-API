import prismaClient from "../../prisma";

interface UserRequest{
    user_id: string;
    name: string;
    endereco: string;
}


export class UpdateUserService {
    async execute({user_id, name, endereco}: UserRequest){

        try{
            //BUSCA O ID DO USUARIO NO SISTEMA
            const userAlredyExists = await prismaClient.user.findFirst({
                where:{
                    id: user_id,
                }
            })
            //VERIFICA SE O USUARIO EXISTE
            if(!userAlredyExists){
                throw new Error("Usuário não existe");
            }
            //ATUALIZA AS INFORMACOES DO USUARIO
            const userUpdated = await prismaClient.user.update({
                where:{
                    id:user_id
                },
                data:{ //DADOS QUE VAI SER ATUALIZADO
                    name, 
                    endereco,
                },
                select:{ // SELECIONA O QUE VAI SER RETORNADO PARA O USUARIO
                    name: true,
                    email: true,
                    endereco: true,
                }
            })

            return userUpdated;
            
        }catch(err){
            console.log(err);
            throw new Error("Erro ao atualizar o usuário")
        }
    }
}