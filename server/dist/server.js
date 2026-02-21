"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_route_1 = __importDefault(require("./routes/main.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Rotes
app.use('/api', main_route_1.default);
app.listen(5000, () => {
    console.log("Сервер запущен");
});
