import { APIAuthenticated } from "../http";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Status } from "../types/AuthTypes";
import { Department, DepartmentData } from "../types/DepartmentTypes";

const initialState: Department = {
  departments: [],
  status: Status.LOADING,
};

const departmentSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus(state: Department, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setDepartments(state: Department, action: PayloadAction<DepartmentData[]>) {
      state.departments = action.payload;
    },
    setDeleteDepartment(
      state: Department,
      action: PayloadAction<DepartmentData["id"]>,
    ) {
      const index = state.departments.findIndex(
        (employee) => employee.id === action.payload,
      );
      console.log(index);

      if (index != -1) {
        state.departments.splice(index, 1);
      }
    },
  },
});

export const { setStatus, setDepartments, setDeleteDepartment } =
  departmentSlice.actions;
export default departmentSlice.reducer;

export function fetchDepartmentData() {
  return async function fetchDepartmentDataThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("department/");
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDepartments(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteDepartment(id: string) {
  return async function deleteDepartmentThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete("department/" + id);
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
