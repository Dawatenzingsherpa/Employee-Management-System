import express,{Application,Response,Request} from 'express'

const app:Application = express();
const PORT : number = 3000;

import * as dotenv from "dotenv"
dotenv.config()

import './Database/connection';

app.get("/",(req,res)=>{
  res.send("hello world");
})

app.listen(PORT,()=>{
  console.log("server has started at",PORT);
})