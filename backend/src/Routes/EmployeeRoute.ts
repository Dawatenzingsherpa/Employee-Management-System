import express,{Router} from 'express'
import EmployeeController from '../Controller/EmployeeController';
import AuthMiddleware from '../Middleware/AuthMiddleware';
import { Role } from '../types/UserTypes';

const router:Router = express.Router();



router.route("/")
.post(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),EmployeeController.addEmployee)
.get(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),EmployeeController.fetchEmployee)

router.route("/single")
.get(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Employee),EmployeeController.fetchSingleEmployeeByUserId)


router.route("/:id")
.get(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),EmployeeController.fetchSingleEmployee)
.patch(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),EmployeeController.updateEmployee)
.delete(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),EmployeeController.deleteEmployee)



export default router