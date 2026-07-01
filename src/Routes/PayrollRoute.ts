import express,{Router} from 'express'
import AuthMiddleware from '../Middleware/AuthMiddleware'
import { Role } from '../types/UserTypes'
import PayrollController from '../Controller/PayrollController'

const router :Router = express.Router()

router.route("/")
.post(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),PayrollController.createPayroll)
.get(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),PayrollController.fetchPayroll)

router.route("/:id")
.get(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),PayrollController.fetchSinglePayroll)
.delete(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Admin),PayrollController.deletePayroll)
export default router