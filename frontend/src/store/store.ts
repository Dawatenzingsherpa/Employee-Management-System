import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import employeeSlice from "./EmployeeSlice";
import departmentSlice from "./DepartmentSlice";
import performanceSlice from "./PerformanceSlice";
import payrollSlice from "./PayrollSlice";
import attendenceSlice from "./AttendenceSlice";
import leaveRequestSlice from "./LeaveRequestSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    employee: employeeSlice,
    department: departmentSlice,
    performance: performanceSlice,
    payroll: payrollSlice,
    attendence: attendenceSlice,
    leaveRequest: leaveRequestSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
