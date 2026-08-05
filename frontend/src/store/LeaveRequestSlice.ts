import { APIAuthenticated } from "../http";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Status } from "../types/AuthTypes";
import {
  LeaveRequest,
  LeaveRequestData,
  LeaveRequestInput,
} from "../types/LeaveRequestTypes";

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
    setAddLeaveRequest(
      state: LeaveRequest,
      action: PayloadAction<LeaveRequestData>,
    ) {
      state.leaveRequestData.push(action.payload);
    },
    setChangeStatus(
      state: LeaveRequest,
      action: PayloadAction<LeaveRequestData>,
    ) {
      const index = state.leaveRequestData.findIndex(
        (request) => request.id == action.payload.id,
      );

      if (index !== -1) {
        state.leaveRequestData[index] = action.payload;
      }
    },
  },
});

export const {
  setStatus,
  setLeaveRequests,
  setDeleteLeaveRequest,
  setAddLeaveRequest,
  setChangeStatus,
} = leaveRequestSlice.actions;
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

export function createLeaveRequest(data: LeaveRequestInput) {
  return async function createDepartmentThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post("leaveRequest/", data);
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setAddLeaveRequest(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function changeRequestStatus(requestStatus: string, id: string) {
  return async function changeRequestStatusThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.patch(
        `leaveRequest/requestStatus/${id}`,
        {
          requestStatus: requestStatus,
        },
      );
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setChangeStatus(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
