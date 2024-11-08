"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const UpdateUserService_1 = require("../../services/user/UpdateUserService");
class UpdateUserController {
    async handle(req, res) {
        const { name, endereco } = req.body;
        const user_id = req.user_id;
        const updateUser = new UpdateUserService_1.UpdateUserService();
        const user = await updateUser.execute({
            user_id,
            name,
            endereco
        });
        return res.json(user);
    }
}
exports.UpdateUserController = UpdateUserController;
