import { APIAuthenticated } from "../http";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Status } from "../types/AuthTypes";
import { Payroll, PayrollData } from "../types/PayrollTypes";

const initialState: Payroll = {
  payrollData: [],
  status: Status.LOADING,
};

const payrollSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus(state: Payroll, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setPayrolls(state: Payroll, action: PayloadAction<PayrollData[]>) {
      state.payrollData = action.payload;
    },
    setDeletePayroll(state: Payroll, action: PayloadAction<PayrollData["id"]>) {
      const index = state.payrollData.findIndex(
        (payroll) => payroll.id === action.payload,
      );

      if (index != -1) {
        state.payrollData.splice(index, 1);
      }
    },
  },
});

export const { setStatus, setPayrolls, setDeletePayroll } =
  payrollSlice.actions;
export default payrollSlice.reducer;

export function fetchPayrollData() {
  return async function fetchPayrollDataThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("payroll/");
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setPayrolls(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deletePayroll(id: string) {
  return async function deletePayrollThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete("payroll/" + id);
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
