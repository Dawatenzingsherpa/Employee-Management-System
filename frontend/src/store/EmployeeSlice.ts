import { APIAuthenticated } from "../http";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Employee, EmployeeData, EmployeeInput } from "../types/EmployeeTypes";
import { Status } from "../types/AuthTypes";

const initialState: Employee = {
  employeeData: [],
  status: Status.LOADING,
  singleEmployee: {} as EmployeeData,
};

const employeeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus(state: Employee, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setEmployeeData(state: Employee, action: PayloadAction<EmployeeData[]>) {
      state.employeeData = action.payload;
    },
    setDeleteEmployee(
      state: Employee,
      action: PayloadAction<EmployeeData["id"]>,
    ) {
      const index = state.employeeData.findIndex(
        (employee) => employee.id === action.payload,
      );
      console.log(index);

      if (index != -1) {
        state.employeeData.splice(index, 1);
      }
    },
    setAddEmployee(state: Employee, action: PayloadAction<EmployeeData>) {
      state.employeeData.push(action.payload);
    },
    setSingleEmployee(state: Employee, action: PayloadAction<EmployeeData>) {
      state.singleEmployee = action.payload;
    },
  },
});

export const {
  setStatus,
  setEmployeeData,
  setDeleteEmployee,
  setAddEmployee,
  setSingleEmployee,
} = employeeSlice.actions;
export default employeeSlice.reducer;

export function fetchEmployeeData() {
  return async function fetchEmployeeDataThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("employee");
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setEmployeeData(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteEmployeeRecord(id: string) {
  return async function deleteEmployeeRecordThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete("employee/" + id);
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function createEmployee(data: EmployeeInput) {
  return async function deleteEmployeeRecordThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post("employee/", data);
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setAddEmployee(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function updateEmployee(data: EmployeeInput, id: string) {
  return async function updateEmployeeThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.patch(`employee/${id}`, data);
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setAddEmployee(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchSingleEmployee(id: string) {
  return async function fetchSingleEmployeeThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get(`employee/${id}`);
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setSingleEmployee(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
