import { Status } from "./AuthTypes";
import { EmployeeData } from "./EmployeeTypes";

export interface PayrollData {
  id: string;
  basicSalary: number;
  allowance: number;
  overtimePay: number;
  bonus: number;
  deducation: number;
  netPay: number;
  createdAt: string;
  updatedAt: string;
  employeeId: string;
  Employee: EmployeeData;
}

export interface Payroll {
  payrollData: PayrollData[];
  status: Status;
}
