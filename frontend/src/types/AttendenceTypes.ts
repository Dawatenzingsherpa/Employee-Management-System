import { Status } from "./AuthTypes";
import { EmployeeData } from "./EmployeeTypes";

export interface AttendenceData {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  overtime: string;
  createdAt: string;
  updatedAt: string;
  employeeId: string;
  Employee: EmployeeData;
}

export interface Attendence {
  attendenceData: AttendenceData[];
  status: Status;
}
