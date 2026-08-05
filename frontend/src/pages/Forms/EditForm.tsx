import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";

import PageMeta from "../../components/common/PageMeta";

import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  departmentField,
  employeeField,
  payrollField,
  performanceField,
} from "./FormData";
import { DepartmentInput } from "../../types/DepartmentTypes";
import { updateDepartment } from "../../store/DepartmentSlice";
import { useLocation } from "react-router";
import { EmployeeInput } from "../../types/EmployeeTypes";
import { updateEmployee } from "../../store/EmployeeSlice";
import { PayrollInput } from "../../types/PayrollTypes";
import { updatePayroll } from "../../store/PayrollSlice";
import { PerformanceInput } from "../../types/PerformanceTyps";
import { updatePerformance } from "../../store/PerformanceSlice";

export default function EditElements() {
  type FormType = keyof typeof editConfig;

  const dispatch = useAppDispatch();
  const { type } = useLocation().state as {
    type: FormType;
  };
  const { singleDepartment } = useAppSelector((state) => state.department);
  const { singleEmployee } = useAppSelector((state) => state.employee);
  const { singlePayroll } = useAppSelector((state) => state.payroll);
  const { singlePerformance } = useAppSelector((state) => state.performance);
  const editConfig = {
    department: {
      title: "Edit Department",
      fields: departmentField,
      initialValue: singleDepartment,
      submitText: "Update Department",
      onSubmit: (data: DepartmentInput) =>
        dispatch(updateDepartment(data, singleDepartment.id)),
    },
    employee: {
      title: "Edit Employee",
      fields: employeeField,
      initialValue: singleEmployee,
      submitText: "Update",
      onSubmit: (data: EmployeeInput) =>
        dispatch(updateEmployee(data, singleEmployee.id)),
    },
    payroll: {
      title: "Edit Payroll",
      fields: payrollField,
      initialValue: singlePayroll,
      submitText: "Update",
      onSubmit: (data: PayrollInput) =>
        dispatch(updatePayroll(data, singlePayroll.id)),
    },
    performance: {
      title: "Edit Performance",
      fields: performanceField,
      initialValue: singlePerformance,
      submitText: "Update",
      onSubmit: (data: PerformanceInput) =>
        dispatch(updatePerformance(data, singlePerformance.id)),
    },
  };

  const config = {
    ...editConfig[type],
    title: `Edit ${type}`,
  };

  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Form Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs config={config} />
        </div>
      </div>
    </div>
  );
}
