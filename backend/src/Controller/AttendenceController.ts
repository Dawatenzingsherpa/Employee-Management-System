import Attendence from "../Database/models/Attendence";
import { Request, Response } from "express";
import Employee from "../Database/models/Employee";

class AttendenceController {
  async checkIn(req: Request, res: Response): Promise<void> {
    const { employeeId } = req.body;

    if (!employeeId) {
      res.status(404).json({
        message: "please provide employeeId",
      });
      return;
    }
    const date = new Date().toLocaleDateString();
    const checkIn = new Date();

    const data = await Attendence.create({
      employeeId,
      date,
      checkIn,
    });

    res.status(201).json({
      message: "Employee checkIn successfully",
      data,
    });
  }

  async checkOut(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = await Attendence.findByPk(id as string);

    if (!data) {
      res.status(404).json({
        message: "No record with that id",
      });
      return;
    }

    data.checkOut = new Date();
    const overtime = calculateOvertime(data);
    data.overtime = overtime;

    data.save();

    res.status(200).json({
      message: "checkout successfully",
      data,
    });
  }

  async fetchSingleAttendence(req: Request, res: Response): Promise<void> {
    const { employeeId } = req.params;
    const data = await Attendence.findAll({
      where: {
        employeeId,
      },
    });

    if (data.length === 0) {
      res.status(404).json({
        message: "No attendence record",
      });
      return;
    }

    res.status(200).json({
      message: "attendence record fetched successfully",
      data,
    });
  }

  async fetchAllAttendence(req: Request, res: Response): Promise<void> {
    const data = await Attendence.findAll({
      include: [
        {
          model: Employee,
        },
      ],
    });

    if (data.length === 0) {
      res.status(404).json({
        message: "No attendence record",
      });
      return;
    }

    res.status(200).json({
      message: "attendence record fetched successfully",
      data,
    });
  }
}

function calculateOvertime(data: any) {
  const checkIn = new Date(data.checkIn).getTime();
  const checkOut = new Date().getTime();
  const workedMinutes = (checkOut - checkIn) / (1000 * 60);
  const workedHours = workedMinutes / 60;

  const requiredMinutes = 8 * 60;
  const overtimeMinutes = Math.max(0, workedMinutes - requiredMinutes);
  const overtimeHour = Number((overtimeMinutes / 60).toFixed(2));
  return overtimeHour;
}

export default new AttendenceController();
