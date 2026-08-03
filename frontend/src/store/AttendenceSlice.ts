import { APIAuthenticated } from "../http";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Status } from "../types/AuthTypes";
import { Attendence, AttendenceData } from "../types/AttendenceTypes";

const initialState: Attendence = {
  attendenceData: [],
  status: Status.LOADING,
};

const attendenceSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus(state: Attendence, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setAttendence(state: Attendence, action: PayloadAction<AttendenceData[]>) {
      state.attendenceData = action.payload;
    },
    // setDeleteAttendence(
    //   state: Attendence,
    //   action: PayloadAction<AttendenceData["id"]>,
    // ) {
    //   const index = state.attendence.findIndex(
    //     (att) => att.id === action.payload,
    //   );

    //   if (index != -1) {
    //     state.attendence.splice(index, 1);
    //   }
    // },
  },
});

export const { setStatus, setAttendence } = attendenceSlice.actions;
export default attendenceSlice.reducer;

export function fetchAttendenceData() {
  return async function fetchAttendenceDataThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("attendence/");
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setAttendence(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// export function deleteAttendence(id: string) {
//   return async function deleteAttendenceThunk(dispatch: AppDispatch) {
//     dispatch(setStatus(Status.LOADING));
//     try {
//       const response = await APIAuthenticated.delete("attendence/" + id);
//       if (response) {
//         dispatch(setStatus(Status.SUCCESS));
//       } else {
//         dispatch(setStatus(Status.ERROR));
//       }
//     } catch (error) {
//       dispatch(setStatus(Status.ERROR));
//     }
//   };
// }
