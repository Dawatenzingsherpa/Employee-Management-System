import express ,{Router} from "express"
import PerformanceController from "../Controller/PerformanceController"
import AuthMiddleware from "../Middleware/AuthMiddleware"
import { Role } from "../types/UserTypes"

const router : Router = express.Router()

router.route("/")
.post(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),PerformanceController.createPerformance)
.get(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),PerformanceController.fetchPerformance)

router.route("/:id")
.get(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin,Role.Employee),PerformanceController.fetchSinlgePerformance)
.patch(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),PerformanceController.updatePerformance)
.delete(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),PerformanceController.deletePerformance)

export default router