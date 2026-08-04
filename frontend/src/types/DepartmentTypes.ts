import { Status } from "./AuthTypes";

export interface DepartmentData {
  id: string;
  departmentName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Department {
  departments: DepartmentData[];
  status: Status;
}

export interface DepartmentInput {
  departmentName: string;
}
