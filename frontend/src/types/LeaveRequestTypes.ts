import { Status } from "./AuthTypes";
import { EmployeeData } from "./EmployeeTypes";

export interface LeaveRequestData {
  id: string;
  date: string;
  leaveDate: string;
  requestStatus: string;
  createdAt: string;
  updatedAt: string;
  employeeId: string;
  Employee: EmployeeData;
}

export interface LeaveRequest {
  leaveRequestData: LeaveRequestData[];
  status: Status;
}
