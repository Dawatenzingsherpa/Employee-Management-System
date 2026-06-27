import express,{Router} from 'express'
import EmployeeController from '../Controller/EmployeeController';


const router:Router = express.Router();



router.route("/")
.post(EmployeeController.addEmployee)
.get(EmployeeController.fetchEmployee)


router.route("/:id")
.get(EmployeeController.fetchSingleEmployee)
.patch(EmployeeController.updateEmployee)
.delete(EmployeeController.deleteEmployee)
export default router