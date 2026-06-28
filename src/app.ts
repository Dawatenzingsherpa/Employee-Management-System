import * as dotenv from "dotenv"
dotenv.config()

import express,{Application,Response,Request} from 'express'

const app:Application = express();
const PORT : number = 3000;



app.use(express.json())

import './Database/connection';
import DepartmentController from "./Controller/DepartmentController";

import employeeRoute from "./Routes/EmployeeRoute"
import departmentRoute from "./Routes/DepartmentRoute"
import attendenceRoute from "./Routes/AttendenceRoute"


// app.get("/",(req,res)=>{
//   res.send("hello world");
// })

app.use("/employee",employeeRoute)
app.use("/department",departmentRoute)
app.use("/attendence",attendenceRoute)


app.listen(PORT,()=>{
  DepartmentController.departmentSeeder();
  console.log("server has started at",PORT);
})