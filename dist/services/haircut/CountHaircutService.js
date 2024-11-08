"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountHaircutService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CountHaircutService {
    async execute({ user_id }) {
        const count = await prisma_1.default.haircut.count({
            where: {
                user_id: user_id
            }
        });
        return count;
    }
}
exports.CountHaircutService = CountHaircutService;
