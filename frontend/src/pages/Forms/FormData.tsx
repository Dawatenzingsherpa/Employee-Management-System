import { DepartmentData } from "../../types/DepartmentTypes";

export const employeeField = (departments: DepartmentData[]) => [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email address",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter phone number",
  },
  {
    name: "hireDate",
    label: "Hire Date",
    type: "date",
  },
  {
    name: "salary",
    label: "Salary",
    type: "number",
    placeholder: "Enter salary",
  },
  {
    name: "departmentId",
    label: "Department",
    type: "select",
    options: departments.map((department) => ({
      label: department.departmentName,
      value: department.id,
    })),
  },
];

export const payrollField = [
  {
    name: "employeeId",
    label: "Employee Id",
    type: "text",
  },
];

export const departmentField = [
  {
    name: "departmentName",
    label: "Department Name",
    type: "text",
  },
];

export const performanceField = [
  {
    name: "attendence",
    label: "Attendance",
    type: "number",
    placeholder: "Enter attendance score",
  },
  {
    name: "quality",
    label: "Quality",
    type: "number",
    placeholder: "Enter quality score",
  },
  {
    name: "productivity",
    label: "Productivity",
    type: "number",
    placeholder: "Enter productivity score",
  },
  {
    name: "teamwork",
    label: "Teamwork",
    type: "number",
    placeholder: "Enter teamwork score",
  },
  {
    name: "employeeId",
    label: "EmployeeId",
    type: "text",
  },
];

export const leaveRequestField = [
  {
    name: "employeeId",
    label: "employee Id",
    type: "text",
  },
  {
    name: "leaveDate",
    label: "Leave Date",
    type: "text",
  },
];
