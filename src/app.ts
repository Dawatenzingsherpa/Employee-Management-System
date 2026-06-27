import * as dotenv from "dotenv"
dotenv.config()

import express,{Application,Response,Request} from 'express'

const app:Application = express();
const PORT : number = 3000;



app.use(express.json())

import './Database/connection';
import employeeRoute from "./Routes/EmployeeRoute"

// app.get("/",(req,res)=>{
//   res.send("hello world");
// })

app.use("/employee",employeeRoute)

app.listen(PORT,()=>{
  console.log("server has started at",PORT);
})