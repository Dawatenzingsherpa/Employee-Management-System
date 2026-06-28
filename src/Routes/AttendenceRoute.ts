import express,{ Router } from "express";
import AttendenceController from "../Controller/AttendenceController";

const router : Router = express.Router()

router.route("/").get(AttendenceController.fetchAllAttendence)

router.route("/:employeeId").get(AttendenceController.fetchSingleAttendence)

router.route("/checkIn/").post(AttendenceController.checkIn)
router.route("/checkOut/:id").patch(AttendenceController.checkOut)
export default router