import Employee from "../Database/models/Employee";
import { Request, Response } from "express";
import { EmployeeData } from "../types/employeeTypes";
import Department from "../Database/models/Department";
import { AuthRequest } from "../Middleware/AuthMiddleware";
import redisClient from "../config/redis";
class EmployeeController {
  public static async addEmployee(req: Request, res: Response): Promise<void> {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        hireDate,
        salary,
        departmentId,
      }: EmployeeData = req.body;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !phoneNumber ||
        !hireDate ||
        !salary ||
        !departmentId
      ) {
        res.status(400).json({
          message:
            "please provide firstName,lastName,email,phoneNumber,hireDate,salary",
        });
        return;
      }

      const data = await Employee.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        hireDate,
        salary,
        departmentId,
      });

      try {
        await redisClient.del("employee:all");
      } catch (error) {
        console.log(`redis error cache`, error);
      }

      res.status(201).json({
        message: "Employee Added Successfully",
        data,
      });
    } catch (err) {
      res.status(404).json({
        message: "something went wrong",
        error: err,
      });
    }
  }

  public static async fetchEmployee(
    req: Request,
    res: Response,
  ): Promise<void> {
    const cacheKey = "employee:all";
    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log(JSON.parse(cachedData));
        res.status(200).json({
          message: "Data Fetched succesfully",
          data: JSON.parse(cachedData),
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }

    const data = await Employee.findAll({
      include: {
        model: Department,
        attributes: ["id", "departmentName"],
      },
    });

    if (data.length === 0) {
      res.status(404).json({
        message: "No employee Data",
      });
      return;
    }

    try {
      await redisClient.setEx(cacheKey, 24 * 60 * 60, JSON.stringify(data));
    } catch (error) {
      console.log(`redis cache error`, error);
    }

    res.status(200).json({
      message: "Data Fetched succesfully",
      data,
    });
  }

  public static async fetchSingleEmployee(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;
    const [data] = await Employee.findAll({
      where: {
        id,
      },
      include: {
        model: Department,
        attributes: ["id", "departmentName"],
      },
    });

    if (!data) {
      res.status(404).json({
        message: "No employee Data with that id",
      });
      return;
    }

    res.status(200).json({
      message: "Data Fetched succesfully",
      data,
    });
  }

  public static async fetchSingleEmployeeByUserId(
    req: AuthRequest,
    res: Response,
  ): Promise<void> {
    const userId = req?.user?.id;
    console.log(userId);
    const [data] = await Employee.findAll({
      where: {
        user_id: userId,
      },
      include: {
        model: Department,
        attributes: ["id", "departmentName"],
      },
    });

    if (!data) {
      res.status(404).json({
        message: "No employee Data with that id",
      });
      return;
    }

    res.status(200).json({
      message: "Data Fetched succesfully",
      data,
    });
  }

  public static async updateEmployee(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      hireDate,
      salary,
      departmentId,
    }: EmployeeData = req.body;

    const [data] = await Employee.findAll({
      where: {
        id,
      },
    });

    if (!data) {
      res.status(404).json({
        message: "No Employee with that id",
      });
      return;
    }

    await Employee.update(
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        hireDate,
        salary,
        departmentId,
      },
      {
        where: {
          id,
        },
      },
    );

    res.status(200).json({
      message: "Employee data updated successfully",
    });
  }

  public static async deleteEmployee(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;

    const [data] = await Employee.findAll({
      where: {
        id,
      },
    });

    if (!data) {
      res.status(404).json({
        message: "No Employee with that id",
      });
      return;
    }

    await Employee.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Data deleted successfully",
    });
  }
}

export default EmployeeController;
