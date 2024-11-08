"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHaircutService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateHaircutService {
    async execute({ user_id, name, price }) {
        if (!name || !price) {
            throw new Error("Erro! Sem nome do corte ou preço");
        }
        //VERIFICAR QUANTOS MODELOS O USUARIO TEM CADASTRADO
        const qtdHaircuts = await prisma_1.default.haircut.count({
            where: {
                user_id: user_id,
            }
        });
        //VERIFICA SE O USUARIO É PREMIUM
        const user = await prisma_1.default.user.findFirst({
            where: {
                id: user_id,
            },
            include: {
                subscriptions: true,
            }
        });
        //VERIFICA SE O USUARIO TEM 3 MODELOS DE CORTES CADASTRADO E NÁO É PREMIUM
        if (user && user.subscriptions && qtdHaircuts >= 3 && user?.subscriptions.status !== 'active') {
            throw new Error("Not authorized");
        }
        const haircut = await prisma_1.default.haircut.create({
            data: {
                name: name,
                price: price,
                user_id: user_id
            }
        });
        return haircut;
    }
}
exports.CreateHaircutService = CreateHaircutService;
