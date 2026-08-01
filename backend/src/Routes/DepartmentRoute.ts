import express,{Router} from "express"
import DepartmentController from "../Controller/DepartmentController"
import AuthMiddleware from "../Middleware/AuthMiddleware"
import { Role } from "../types/UserTypes"

const router : Router = express.Router()

router.route("/")
.post(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),DepartmentController.createDepartment)
.get(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),DepartmentController.getDepartments)


router.route("/:id")
.get(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),DepartmentController.getSingleDepartment)
.patch(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),DepartmentController.updateDepartment)
.delete(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),DepartmentController.deleteDepartment)

export default router