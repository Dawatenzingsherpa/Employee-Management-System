import { Status } from "./AuthTypes";
import { DepartmentData } from "./DepartmentTypes";

export interface EmployeeData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  hireDate: string;
  salary: number;
  createdAt: string;
  updatedAt: string;
  departmentId: string;
  Department: DepartmentData;
}

export interface Employee {
  employeeData: EmployeeData[];
  status: Status;
}
