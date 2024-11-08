"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//USER
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const UpdateUserController_1 = require("./controllers/user/UpdateUserController");
//HAIRCUT
const CreateHaircutController_1 = require("./controllers/haircut/CreateHaircutController");
const ListHaircutController_1 = require("./controllers/haircut/ListHaircutController");
const UpdateHaircutController_1 = require("./controllers/haircut/UpdateHaircutController");
const CheckSubscriptionController_1 = require("./controllers/haircut/CheckSubscriptionController");
const CountHaircutController_1 = require("./controllers/haircut/CountHaircutController");
const DetailHaircutController_1 = require("./controllers/haircut/DetailHaircutController");
//SCHEDULE
const NewScheduleController_1 = require("./controllers/schedule/NewScheduleController");
const ListScheduleController_1 = require("./controllers/schedule/ListScheduleController");
const FinishScheduleController_1 = require("./controllers/schedule/FinishScheduleController");
//Middlewares
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const router = (0, express_1.Router)();
exports.router = router;
// -------- ROTAS USER -------------
router.post("/session", new AuthUserController_1.AuthUserController().handle);
router.post("/users", new CreateUserController_1.CreateUserController().handle);
router.put("/users", isAuthenticated_1.isAuthenticated, new UpdateUserController_1.UpdateUserController().handle);
router.get("/me", isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
// -----------ROTA HAIRCUT -----------
router.post("/haircut", isAuthenticated_1.isAuthenticated, new CreateHaircutController_1.CreateHaircutController().handle);
router.put("/haircut", isAuthenticated_1.isAuthenticated, new UpdateHaircutController_1.UpdateHaircutController().handle);
router.get("/haircuts", isAuthenticated_1.isAuthenticated, new ListHaircutController_1.ListHaircutController().handle);
router.get("/haircut/check", isAuthenticated_1.isAuthenticated, new CheckSubscriptionController_1.CheckSubscriptionController().handle);
router.get("/haircut/count", isAuthenticated_1.isAuthenticated, new CountHaircutController_1.CountHaircutController().handle);
router.get("/haircut/detail", isAuthenticated_1.isAuthenticated, new DetailHaircutController_1.DetailHaircutController().handle);
//----------------ROTA SCHEDULE/ SERVICOS-----------------
router.post("/schedule", isAuthenticated_1.isAuthenticated, new NewScheduleController_1.NewScheduleController().handle);
router.get("/schedule", isAuthenticated_1.isAuthenticated, new ListScheduleController_1.ListScheduleController().handle);
router.delete("/schedule", isAuthenticated_1.isAuthenticated, new FinishScheduleController_1.FinishScheduleController().handle);
