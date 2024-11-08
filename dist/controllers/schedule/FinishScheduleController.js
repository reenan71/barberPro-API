"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishScheduleController = void 0;
const FinishScheduleService_1 = require("./../../services/schedule/FinishScheduleService");
class FinishScheduleController {
    async handle(req, res) {
        const user_id = req.user_id;
        const schedule_id = req.query.schedule_id;
        const finishScheduleService = new FinishScheduleService_1.FinishScheduleService();
        const schedule = await finishScheduleService.execute({
            user_id,
            schedule_id
        });
        return res.json(schedule);
    }
}
exports.FinishScheduleController = FinishScheduleController;
