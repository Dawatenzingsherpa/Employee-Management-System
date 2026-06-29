import express,{Router} from 'express'
import LeaveRequestController from '../Controller/LeaveRequestController'

const router:Router = express.Router()

router.route("/").post(LeaveRequestController.createLeaveRequest).get(LeaveRequestController.fetchLeaveRequest)
router.route("/:id").patch(LeaveRequestController.updateLeaveRequest).delete(LeaveRequestController.deleteLeaveRequest)


router.route("/requestStatus/:id").patch(LeaveRequestController.updateRequestStatus)
export default router