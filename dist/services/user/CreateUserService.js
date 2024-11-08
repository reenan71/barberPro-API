"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs"); //Biblioteca para criptografar senhas
class CreateUserService {
    async execute({ name, email, password }) {
        if (!email) { //Se não tiver email preenchido, apresenta esse erro
            throw new Error("Email incorreto");
        }
        const userAlreadyExists = await prisma_1.default.user.findFirst({
            where: {
                email: email
            }
        });
        if (userAlreadyExists) { //Se encontrar email igual, irá apresentar esse erro.
            throw new Error("Email ou Usuario já está cadastrado");
        }
        const passwordHash = await (0, bcryptjs_1.hash)(password, 8); //Faz com que a senha seja criptografada
        const user = await prisma_1.default.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        return user;
    }
}
exports.CreateUserService = CreateUserService;
