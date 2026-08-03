import { Status } from "./AuthTypes";
import { EmployeeData } from "./EmployeeTypes";

export interface PerformanceData {
  id: string;
  attendence: number;
  quality: number;
  productivity: number;
  teamwork: number;
  totalScore: number;
  rating: Rating;
  createdAt: string;
  updatedAt: string;
  employeeId: string;
  Employee: EmployeeData;
}

export enum Rating {
  Good = "good",
  Excellent = "excellent",
  Average = "average",
}

export interface Performances {
  performanceData: PerformanceData[];
  status: Status;
}
