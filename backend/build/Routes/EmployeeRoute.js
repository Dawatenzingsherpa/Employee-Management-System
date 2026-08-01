"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmployeeController_1 = __importDefault(require("../Controller/EmployeeController"));
const router = express_1.default.Router();
router.route("/").post(EmployeeController_1.default.addEmployee)
    .get((req, res) => {
    res.status(200).json({
        message: "hello"
    });
});
exports.default = router;
//# sourceMappingURL=EmployeeRoute.js.map