import * as dotenv from "dotenv"
dotenv.config()

import express,{Application,Response,Request} from 'express'

const app:Application = express();
const PORT : number = 3000;



app.use(express.json())

import './Database/connection';
import employeeRoute from "./Routes/EmployeeRoute"
import departmentRoute from "./Routes/DepartmentRoute"
import DepartmentController from "./Controller/DepartmentController";

// app.get("/",(req,res)=>{
//   res.send("hello world");
// })

app.use("/employee",employeeRoute)
app.use("/department",departmentRoute)


app.listen(PORT,()=>{
  DepartmentController.departmentSeeder();
  console.log("server has started at",PORT);
})