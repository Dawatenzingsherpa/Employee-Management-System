import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import express, { Application, Response, Request } from "express";
import redisClient, { connectRedis } from "./config/redis";
import limiter from "./Middleware/RateLimiter";

const app: Application = express();
const PORT: number = 3000;

app.use(
  cors({
    origin: [
      "https://employee-management-system-umber-nine.vercel.app",
      "https://employee-frontend-eight-livid.vercel.app",
    ],
  }),
);

app.use(express.json());

app.use(limiter);

import "./Database/connection";
import DepartmentController from "./Controller/DepartmentController";

import employeeRoute from "./Routes/EmployeeRoute";
import departmentRoute from "./Routes/DepartmentRoute";
import attendenceRoute from "./Routes/AttendenceRoute";
import leaveRequestRoute from "./Routes/LeaveRequestRoute";
import userRoute from "./Routes/UserRoute";
import performanceRoute from "./Routes/PerformanceRoute";
import payrollRoute from "./Routes/PayrollRoute";

// app.get("/",(req,res)=>{
//   res.send("hello world");
// })

app.use("/employee", employeeRoute);
app.use("/department", departmentRoute);
app.use("/attendence", attendenceRoute);
app.use("/leaveRequest", leaveRequestRoute);
app.use("/user", userRoute);
app.use("/performance", performanceRoute);
app.use("/payroll", payrollRoute);

app.listen(PORT, async () => {
  await connectRedis();
  DepartmentController.departmentSeeder();
  console.log("server has started at", PORT);
});
