import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Status } from "../types/AuthTypes";
import { setStatus } from "./authSlice";
import { APIAuthenticated } from "../http";

interface DepartmentData {
  id: string;
  departmentName: string;
}

interface EmployeeData {
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

interface Data {
  employee: EmployeeData;
  status: Status;
}

const initialState: Data = {
  employee: {} as EmployeeData,
  status: Status.LOADING,
};

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    setEmployee(state: Data, actions: PayloadAction<EmployeeData>) {
      state.employee = actions.payload;
    },
    setStatus(state: Data, actions: PayloadAction<Status>) {
      state.status = actions.payload;
    },
  },
});

const { setEmployee } = dataSlice.actions;
export default dataSlice.reducer;

export function fetchSingleEmployee() {
  return async function fetchSingleEmployeeThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const respones = await APIAuthenticated.get("employee/single");
      if (respones) {
        dispatch(setEmployee(respones.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
