"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListScheduleController = void 0;
const ListScheduleService_1 = require("../../services/schedule/ListScheduleService");
class ListScheduleController {
    async handle(req, res) {
        const user_id = req.user_id;
        const listSchedule = new ListScheduleService_1.ListScheduleService();
        const schedule = await listSchedule.execute({
            user_id
        });
        return res.json(schedule);
    }
}
exports.ListScheduleController = ListScheduleController;
