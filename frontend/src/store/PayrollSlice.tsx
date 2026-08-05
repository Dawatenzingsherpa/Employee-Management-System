import { APIAuthenticated } from "../http";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Status } from "../types/AuthTypes";
import { Payroll, PayrollData, PayrollInput } from "../types/PayrollTypes";

const initialState: Payroll = {
  payrollData: [],
  status: Status.LOADING,
  singlePayroll: {} as PayrollData,
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
    setAddPayroll(state: Payroll, action: PayloadAction<PayrollData>) {
      state.payrollData.push(action.payload);
    },
    setSinglePayroll(state: Payroll, action: PayloadAction<PayrollData>) {
      state.singlePayroll = action.payload;
    },
  },
});

export const {
  setStatus,
  setPayrolls,
  setDeletePayroll,
  setAddPayroll,
  setSinglePayroll,
} = payrollSlice.actions;
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

export function createPayroll(data: PayrollInput) {
  return async function createPerformanceThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post("payroll/", data);
      console.log(response.data.data);
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setAddPayroll(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function updatePayroll(data: PayrollInput, id: string) {
  return async function updatePayrollThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.patch(`payroll/${id}`, data);
      console.log(response.data.data);
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
