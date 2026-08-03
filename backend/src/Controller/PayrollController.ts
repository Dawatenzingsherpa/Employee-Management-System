import Attendence from "../Database/models/Attendence";
import Employee from "../Database/models/Employee";
import Performance from "../Database/models/Performance";
import Payroll from "../Database/models/Payroll";
import { Request, Response } from "express";

class PayrollController {
  async createPayroll(req: Request, res: Response): Promise<void> {
    const { employeeId } = req.body;
    let bonus: number = 0;
    let overtime: number = 0;

    if (!employeeId) {
      res.status(400).json({
        message: "please provide employeeId",
      });
      return;
    }

    const employeeData = await Employee.findByPk(employeeId as string);
    //fetch basic salary from employee table
    const basicSalary: any = employeeData?.salary;

    //allowance = 10 percent of basic salary
    const allowance = Math.round(0.1 * basicSalary);

    //calculating overtime pay from attendence table
    const attendenceData: any = await Attendence.findAll({
      where: {
        employeeId,
      },
    });

    if (attendenceData.length > 0) {
      for (let i = 0; i < attendenceData.length; i++) {
        overtime += Number(attendenceData[i].overtime);
      }
    }
    const overtimePay = overtime * 200;

    //bonus based on performance rating
    const [performance] = await Performance.findAll({
      where: {
        employeeId,
      },
    });

    if (performance?.rating == "excellent") {
      bonus = 5000;
    }

    const totalPay: number = basicSalary + allowance + overtimePay + bonus;
    //deduction is tax 10 percent
    const deducation: number = Number((totalPay * 0.1).toFixed(2));

    const netPay: number = totalPay - deducation;

    const data = await Payroll.create({
      employeeId,
      basicSalary,
      allowance,
      overtimePay,
      bonus,
      deducation,
      netPay,
    });

    res.status(201).json({
      message: "payroll created successfully",
      data,
    });
  }

  async fetchSinglePayroll(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = await Payroll.findByPk(id as string);

    if (!data) {
      res.status(404).json({
        message: "no data with that id ",
      });
      return;
    }

    res.status(200).json({
      message: "data fetched successfully",
      data,
    });
  }

  async fetchPayroll(req: Request, res: Response): Promise<void> {
    const data = await Payroll.findAll({
      include: [
        {
          model: Employee,
        },
      ],
    });

    if (data.length === 0) {
      res.status(404).json({
        message: "no data",
      });
      return;
    }

    res.status(200).json({
      message: "data fetched successfully",
      data,
    });
  }

  async deletePayroll(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = await Payroll.findByPk(id as string);

    if (!data) {
      res.status(404).json({
        message: "no data with that id ",
      });
      return;
    }

    await Payroll.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "data deleted successfully",
    });
  }
}

export default new PayrollController();
