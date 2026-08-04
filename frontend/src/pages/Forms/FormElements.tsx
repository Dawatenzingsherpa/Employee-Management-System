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
import { useState } from "react";

export default function FormElements() {
  type FormType = keyof typeof forms;
  const [SelectForm, setSelectForm] = useState<FormType>("employee");

  const forms = {
    employee: {
      title: "Create Employee",
      fields: employeeField,
      submitText: "Save Employee",
      onSubmit: () => console.log("employee"),
    },

    department: {
      title: "Create Department",
      fields: departmentField,
      submitText: "Save Department",
      onSubmit: () => console.log("departments"),
    },
    payroll: {
      title: "Create Payroll",
      fields: payrollField,
      submitText: "create Payroll",
      onSubmit: () => console.log("payroll"),
    },
    performance: {
      title: "Create Performance",
      fields: performanceField,
      submitText: "create Performance",
      onSubmit: () => console.log("performance"),
    },
    leaveRequest: {
      title: "Create Leave Request",
      fields: leaveRequestField,
      submitText: "create Leave Request",
      onSubmit: () => console.log("leaveRequest"),
    },
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
