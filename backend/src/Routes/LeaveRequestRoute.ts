import express, { Router } from "express";
import LeaveRequestController from "../Controller/LeaveRequestController";
import AuthMiddleware from "../Middleware/AuthMiddleware";
import { Role } from "../types/UserTypes";

const router: Router = express.Router();

router
  .route("/")
  .post(
    AuthMiddleware.authentication,
    AuthMiddleware.restrictTo(Role.Employee, Role.Admin),
    LeaveRequestController.createLeaveRequest,
  )
  .get(
    AuthMiddleware.authentication,
    AuthMiddleware.restrictTo(Role.Admin),
    LeaveRequestController.fetchLeaveRequest,
  );
router
  .route("/:id")
  .patch(
    AuthMiddleware.authentication,
    AuthMiddleware.restrictTo(Role.Admin, Role.Employee),
    LeaveRequestController.updateLeaveRequest,
  )
  .delete(
    AuthMiddleware.authentication,
    AuthMiddleware.restrictTo(Role.Admin, Role.Admin),
    LeaveRequestController.deleteLeaveRequest,
  )
  .get(AuthMiddleware.authentication,AuthMiddleware.restrictTo(Role.Employee),LeaveRequestController.fetchSingleLeaveRequest);


router
  .route("/requestStatus/:id")
  .patch(
    AuthMiddleware.authentication,
    AuthMiddleware.restrictTo(Role.Admin),
    LeaveRequestController.updateRequestStatus,
  );
export default router;
