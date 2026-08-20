import { Request, Response } from "express";
import LeaveRequest from "../Database/models/LeaveRequest";
import { RequestStatus } from "../types/LeaveTypes";
import Employee from "../Database/models/Employee";
class LeaveRequestController {
  async createLeaveRequest(req: Request, res: Response): Promise<void> {
    const { leaveDate, employeeId } = req.body;
    console.log(leaveDate,employeeId)

    if (!leaveDate || !employeeId) {
      res.status(400).json({
        message: "please provide leaveDate and employeeId",
      });
      return;
    }

    const date = new Date().toLocaleString();

    const data = await LeaveRequest.create({
      date,
      leaveDate,
      employeeId,
    });

    res.status(201).json({
      message: "Leave Request created successfully",
      data,
    });
  }

  async updateRequestStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { requestStatus } = req.body;

    if (!requestStatus) {
      res.status(404).json({
        message: "please provide requestStatus",
      });
      return;
    }

    const data = await LeaveRequest.findByPk(id as string);
    if (!data) {
      res.status(404).json({
        message: "NO leave request with that id",
      });

      return;
    }

    if (Object.values(RequestStatus).includes(requestStatus)) {
      data.requestStatus = requestStatus as RequestStatus;
      data.save();

      res.status(200).json({
        message: "requestStatus updated successfully",
        data,
      });
    } else {
      res.status(400).json({
        message: "please provide appropriate requestStatus",
      });
    }
  }

  async updateLeaveRequest(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { leaveDate } = req.body;

    if (!leaveDate) {
      res.status(404).json({
        message: "please provide requestStatus",
      });
      return;
    }

    const data = await LeaveRequest.findByPk(id as string);
    if (!data) {
      res.status(404).json({
        message: "NO leave request with that id",
      });

      return;
    }

    data.leaveDate = leaveDate;
    data.requestStatus = "pending";
    data.save();

    res.status(200).json({
      message: "requestStatus updated successfully",
      data,
    });
  }

  async deleteLeaveRequest(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = await LeaveRequest.findByPk(id as string);
    if (!data) {
      res.status(404).json({
        message: "no leave request with that id ",
      });
      return;
    }

    await LeaveRequest.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "leave Request deleted successfully",
    });
  }

  async fetchLeaveRequest(req: Request, res: Response): Promise<void> {
    const data = await LeaveRequest.findAll({
      include: [
        {
          model: Employee,
        },
      ],
    });
    if (data.length === 0) {
      res.status(404).json({
        message: "no leave request with that id ",
      });
      return;
    }

    res.status(200).json({
      message: "leave Request fetch successfully",
      data,
    });
  }

    async fetchSingleLeaveRequest(req: Request, res: Response): Promise<void> {
      const {id} = req.params;
    const data = await LeaveRequest.findAll({
      where : {
        employeeId : id
      },
      
    });
    if (data.length === 0) {
      res.status(404).json({
        message: "no leave request with that id ",
      });
      return;
    }

    res.status(200).json({
      message: "leave Request fetch successfully",
      data,
    });
  }

}

export default new LeaveRequestController();
