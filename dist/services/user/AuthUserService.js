"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    async execute({ email, password }) {
        const user = await prisma_1.default.user.findFirst({
            where: {
                email: email,
            },
            include: {
                subscriptions: true,
            }
        });
        if (!user) {
            throw new Error("Email ou senha incorretos");
        }
        //Compara a senha que está sendo digitada com a senha salva no DB
        const passwordMatch = await (0, bcryptjs_1.compare)(password, user?.password);
        if (!passwordMatch) {
            throw new Error("Email ou senha incorretos");
        }
        //GERAR TOKEN AO LOGAR
        const token = (0, jsonwebtoken_1.sign)({
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET || 'default_secret', {
            subject: user.id,
            expiresIn: '30d' //TOKEN EXPIRA EM 30 DIAS
        });
        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            endereco: user?.endereco,
            token: token,
            subscriptions: user.subscriptions ? {
                id: user?.subscriptions.id,
                status: user?.subscriptions.status
            } : null
        };
    }
}
exports.AuthUserService = AuthUserService;
