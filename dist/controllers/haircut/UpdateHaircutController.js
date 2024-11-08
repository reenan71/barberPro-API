"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHaircutController = void 0;
const UpdateHaircutService_1 = require("../../services/haircut/UpdateHaircutService");
class UpdateHaircutController {
    async handle(req, res) {
        const user_id = req.user_id;
        const { name, price, status, haircut_id } = req.body;
        const updateHaircut = new UpdateHaircutService_1.UpdateHaircutService();
        const haircut = await updateHaircut.execute({
            user_id,
            name,
            price,
            status,
            haircut_id
        });
        return res.json(haircut);
    }
}
exports.UpdateHaircutController = UpdateHaircutController;
