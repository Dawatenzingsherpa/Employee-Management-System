import { APIAuthenticated } from "../http";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Status } from "../types/AuthTypes";
import { LeaveRequest, LeaveRequestData } from "../types/LeaveRequestTypes";

const initialState: LeaveRequest = {
  leaveRequestData: [],
  status: Status.LOADING,
};

const leaveRequestSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus(state: LeaveRequest, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setLeaveRequests(
      state: LeaveRequest,
      action: PayloadAction<LeaveRequestData[]>,
    ) {
      state.leaveRequestData = action.payload;
    },
    setDeleteLeaveRequest(
      state: LeaveRequest,
      action: PayloadAction<LeaveRequestData["id"]>,
    ) {
      const index = state.leaveRequestData.findIndex(
        (request) => request.id === action.payload,
      );

      if (index != -1) {
        state.leaveRequestData.splice(index, 1);
      }
    },
  },
});

export const { setStatus, setLeaveRequests, setDeleteLeaveRequest } =
  leaveRequestSlice.actions;
export default leaveRequestSlice.reducer;

export function fetchLeaveRequestData() {
  return async function fetchLeaveRequestDataThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("leaveRequest/");
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setLeaveRequests(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteLeaveRequest(id: string) {
  return async function deleteleaveRequestThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete("leaveRequest/" + id);
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
