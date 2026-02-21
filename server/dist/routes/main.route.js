"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_controller_1 = require("../controllers/main.controller");
const router = (0, express_1.Router)();
router.get('/', main_controller_1.getMain);
exports.default = router;
