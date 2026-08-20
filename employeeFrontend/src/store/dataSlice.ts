import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Status } from "../types/AuthTypes";
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

interface AttendenceData {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  overtime: string;
  createdAt: string;
  updatedAt: string;
  employeeId: string;
  Employee: EmployeeData;
}

interface LeaveRequestData{
            id: string,
            date: string,
            leaveDate: string,
            requestStatus:string,
            createdAt: string,
            updatedAt: string,
            employeeId: string
        }

interface PerformanceData{
        id: string,
        employeeId: string,
        attendence: number,
        quality: number,
        productivity: number,
        teamwork: number,
        totalScore: number,
        rating: string,
        updatedAt: string,
        createdAt: string
    }

interface PayrollData{
  
            id: string,
            basicSalary: number,
            allowance: number,
            overtimePay: number,
            bonus: number,
            deducation: number,
            netPay: number,
            createdAt: string,
            updatedAt: string,
            employeeId: string,
            Employee: EmployeeData
        
}

interface Data {
  employee: EmployeeData;
  attendenceData: AttendenceData[];
  payrollData : PayrollData[];
  performanceData : PerformanceData[];
  leaveRequestData : LeaveRequestData[];
  status: Status;
}

const initialState: Data = {
  employee: {} as EmployeeData,
  attendenceData: [],
  payrollData : [],
  performanceData : [],
  leaveRequestData : [],
  status: Status.LOADING,
};

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    setEmployee(state: Data, actions: PayloadAction<EmployeeData>) {
      state.employee = actions.payload;
    },
    setAttendence(state: Data, actions: PayloadAction<AttendenceData[]>) {
      state.attendenceData = actions.payload;
    },
    setPayroll(state:Data,actions:PayloadAction<PayrollData[]>){
      state.payrollData = actions.payload
    },
    setPerformance(state:Data,actions:PayloadAction<PerformanceData[]>){
      state.performanceData = actions.payload
    },
    setLeaveRequest(state:Data,actions:PayloadAction<LeaveRequestData[]>){
      state.leaveRequestData = actions.payload
    },
    setCheckIn(state:Data,actions:PayloadAction<AttendenceData>){
      state.attendenceData.push(actions.payload)
    },
    setCheckOut(state:Data,actions:PayloadAction<AttendenceData>){
      const index = state.attendenceData.findIndex((item)=>item.id === actions.payload.id)
      if(index !=-1){
        state.attendenceData[index] = actions.payload
      }
    },
    setAddLeaveRequest(state:Data,action:PayloadAction<LeaveRequestData>){
      state.leaveRequestData.push(action.payload)
    },
    
    setStatus(state: Data, actions: PayloadAction<Status>) {
      state.status = actions.payload;
    },
  },
});

const { setEmployee, setStatus, setAttendence,setPayroll,setPerformance ,setLeaveRequest,setCheckIn,setCheckOut,setAddLeaveRequest} = dataSlice.actions;
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

export function fetchSingleAttendence(id: string) {
  return async function fetchSingleAttendenceThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const respones = await APIAuthenticated.get("attendence/" + id);
      if (respones) {
        dispatch(setAttendence(respones.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function checkIn(id:string) {
  return async function checkInThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const respones = await APIAuthenticated.post("attendence/checkIn/",{employeeId : id});
      if (respones) {
        dispatch(setCheckIn(respones.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}


export function checkOut(id:string) {
  return async function checkOutThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const respones = await APIAuthenticated.patch("attendence/checkOut/"+id);
      if (respones) {
        dispatch(setCheckOut(respones.data.data))
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchSinglePayroll(id: string) {
  return async function fetchSinglePayrollThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const respones = await APIAuthenticated.get("payroll/" + id);
      if (respones) {
        dispatch(setPayroll(respones.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchSinglePerformance(id: string) {
  return async function fetchSinglePerformanceThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const respones = await APIAuthenticated.get("performance/" + id);
      if (respones) {
        dispatch(setPerformance(respones.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchSingleLeaveRequest(id: string) {
  return async function fetchSingleLeaveRequestThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const respones = await APIAuthenticated.get("leaverequest/" + id);
      if (respones) {
        dispatch(setLeaveRequest(respones.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function addLeaveRequest(data:any) {
  return async function addLeaveRequestThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const respones = await APIAuthenticated.post("leaverequest/",data);
      if (respones) {
        dispatch(setAddLeaveRequest(respones.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
