import express,{ Router } from "express";
import AttendenceController from "../Controller/AttendenceController";
import AuthMiddleware from "../Middleware/AuthMiddleware";
import { Role } from "../types/UserTypes";
const router : Router = express.Router()

router.route("/").get(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),AttendenceController.fetchAllAttendence)

router.route("/:employeeId").get(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin,Role.Employee),AttendenceController.fetchSingleAttendence)

router.route("/checkIn/").post(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Employee),AttendenceController.checkIn)
router.route("/checkOut/:id").patch(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Employee),AttendenceController.checkOut)
export default router