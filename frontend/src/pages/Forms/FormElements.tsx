import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";

import PageMeta from "../../components/common/PageMeta";
import {
  departmentField,
  employeeField,
  leaveRequestField,
  payrollField,
  performanceField,
} from "./FormData";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { createEmployee } from "../../store/EmployeeSlice";
import { EmployeeInput } from "../../types/EmployeeTypes";
import { PerformanceInput } from "../../types/PerformanceTyps";
import { createPerformance } from "../../store/PerformanceSlice";
import { createPayroll } from "../../store/PayrollSlice";
import {
  createDepartment,
  fetchDepartmentData,
} from "../../store/DepartmentSlice";
import { createLeaveRequest } from "../../store/LeaveRequestSlice";
import { DepartmentInput } from "../../types/DepartmentTypes";
import { PayrollInput } from "../../types/PayrollTypes";
import { LeaveRequestInput } from "../../types/LeaveRequestTypes";

export default function FormElements() {
  type FormType = keyof typeof forms;
  const [SelectForm, setSelectForm] = useState<FormType>("employee");
  const dispatch = useAppDispatch();
  const { departments } = useAppSelector((state) => state.department);

  useEffect(() => {
    dispatch(fetchDepartmentData());
  }, [dispatch]);

  const forms = {
    employee: {
      title: "Create Employee",
      fields: employeeField(departments),
      submitText: "Save Employee",
      onSubmit: (data: EmployeeInput) => dispatch(createEmployee(data)),
    },

    department: {
      title: "Create Department",
      fields: departmentField,
      submitText: "Save Department",
      onSubmit: (data: DepartmentInput) => dispatch(createDepartment(data)),
    },
    payroll: {
      title: "Create Payroll",
      fields: payrollField,
      submitText: "create Payroll",
      onSubmit: (data: PayrollInput) => dispatch(createPayroll(data)),
    },
    performance: {
      title: "Create Performance",
      fields: performanceField,
      submitText: "create Performance",
      onSubmit: (data: PerformanceInput) => dispatch(createPerformance(data)),
    },
    leaveRequest: {
      title: "Create Leave Request",
      fields: leaveRequestField,
      submitText: "create Leave Request",
      onSubmit: (data: LeaveRequestInput) => dispatch(createLeaveRequest(data)),
    },
  };
  return (
    <div>
      <PageMeta
        title="EMS"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Form Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <select
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setSelectForm(e.target.value as FormType)}
          >
            <option value="">Select</option>
            <option value="employee">Employee </option>
            <option value="payroll">Payroll</option>
            <option value="department">Department</option>
            <option value="performance">Performance</option>
            <option value="leaveRequest">Leave Request</option>
          </select>
          <DefaultInputs config={forms[SelectForm]} />
        </div>
      </div>
    </div>
  );
}
