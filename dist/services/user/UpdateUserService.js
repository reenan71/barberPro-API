"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateUserService {
    async execute({ user_id, name, endereco }) {
        try {
            //BUSCA O ID DO USUARIO NO SISTEMA
            const userAlredyExists = await prisma_1.default.user.findFirst({
                where: {
                    id: user_id,
                }
            });
            //VERIFICA SE O USUARIO EXISTE
            if (!userAlredyExists) {
                throw new Error("Usuário não existe");
            }
            //ATUALIZA AS INFORMACOES DO USUARIO
            const userUpdated = await prisma_1.default.user.update({
                where: {
                    id: user_id
                },
                data: {
                    name,
                    endereco,
                },
                select: {
                    name: true,
                    email: true,
                    endereco: true,
                }
            });
            return userUpdated;
        }
        catch (err) {
            console.log(err);
            throw new Error("Erro ao atualizar o usuário");
        }
    }
}
exports.UpdateUserService = UpdateUserService;
