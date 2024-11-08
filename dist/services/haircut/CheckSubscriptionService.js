"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckSubscriptionService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CheckSubscriptionService {
    async execute({ user_id }) {
        const status = await prisma_1.default.user.findFirst({
            where: {
                id: user_id,
            },
            select: {
                subscriptions: {
                    select: {
                        id: true,
                        status: true
                    }
                }
            }
        });
        return status;
    }
}
exports.CheckSubscriptionService = CheckSubscriptionService;
