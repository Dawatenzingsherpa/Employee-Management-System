import { APIAuthenticated } from "../http";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Status } from "../types/AuthTypes";
import {
  PerformanceData,
  PerformanceInput,
  Performances,
} from "../types/PerformanceTyps";

const initialState: Performances = {
  performanceData: [],
  status: Status.LOADING,
  singlePerformance: {} as PerformanceData,
};

const performanceSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus(state: Performances, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setPerformances(
      state: Performances,
      action: PayloadAction<PerformanceData[]>,
    ) {
      state.performanceData = action.payload;
    },
    setDeletePerformance(
      state: Performances,
      action: PayloadAction<PerformanceData["id"]>,
    ) {
      const index = state.performanceData.findIndex(
        (per) => per.id === action.payload,
      );

      if (index != -1) {
        state.performanceData.splice(index, 1);
      }
    },
    setAddPerformance(
      state: Performances,
      action: PayloadAction<PerformanceData>,
    ) {
      state.performanceData.push(action.payload);
    },
    setSinglePerformance(
      state: Performances,
      action: PayloadAction<PerformanceData>,
    ) {
      state.singlePerformance = action.payload;
    },
  },
});

export const {
  setStatus,
  setPerformances,
  setDeletePerformance,
  setAddPerformance,
  setSinglePerformance,
} = performanceSlice.actions;
export default performanceSlice.reducer;

export function fetchPerformanceData() {
  return async function fetchPerformanceDataThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("performance/");
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setPerformances(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deletePerformance(id: string) {
  return async function deletePerformanceThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete("performance/" + id);
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

export function createPerformance(data: PerformanceInput) {
  return async function createPerformanceThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post("performance/", data);
      console.log(response.data.data);
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setAddPerformance(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function updatePerformance(data: PerformanceInput, id: string) {
  return async function updatePerformanceThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.patch(`performance/${id}`, data);
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
