"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountHaircutController = void 0;
const CountHaircutService_1 = require("../../services/haircut/CountHaircutService");
class CountHaircutController {
    async handle(req, res) {
        const user_id = req.user_id;
        const countHaircuts = new CountHaircutService_1.CountHaircutService();
        const count = await countHaircuts.execute({
            user_id
        });
        return res.json(count);
    }
}
exports.CountHaircutController = CountHaircutController;
