import express,{Router} from "express"
import DepartmentController from "../Controller/DepartmentController"

const router : Router = express.Router()

router.route("/")
.post(DepartmentController.createDepartment)
.get(DepartmentController.getDepartments)


router.route("/:id")
.get(DepartmentController.getSingleDepartment)
.patch(DepartmentController.updateDepartment)
.delete(DepartmentController.deleteDepartment)

export default router