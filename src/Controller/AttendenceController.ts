import Attendence from "../Database/models/Attendence";
import { Request,Response } from "express";

class AttendenceController{
  async checkIn(req:Request,res:Response):Promise<void>{
    const {employeeId} = req.body

    if(!employeeId){
      res.status(404).json({
        message : "please provide employeeId"
      })
      return
    }
    const date = new Date().toLocaleDateString()
    const checkIn = new Date().toLocaleTimeString('en-Us',{
      hour : "numeric",
      minute : "2-digit",
      hour12 : true
    })

    const data = await Attendence.create({
      employeeId,
      date,
      checkIn
    })

    res.status(201).json({
      message : "Employee checkIn successfully",
      data
    })
  }

  async checkOut(req:Request,res:Response):Promise<void>{
    const {id} = req.params;
    const data = await Attendence.findByPk(id as string);

    if(!data){
      res.status(404).json({
        message : "No record with that id"
      })
      return
    }

    data.checkOut = new Date().toLocaleTimeString('en-Us',{
      hour : "numeric",
      minute : "2-digit",
      hour12 : true
    })
    data.save()

    res.status(200).json({
      message : "checkout successfully",
      data
    })
  }


  async fetchSingleAttendence(req:Request,res:Response):Promise<void>{
    const {employeeId} = req.params
    const data = await Attendence.findAll({
      where :{
        employeeId
      }
    })

    if(data.length===0){
      res.status(404).json({
        message : "No attendence record"
      })
      return
    }

    res.status(200).json({
      message : "attendence record fetched successfully",
      data
    })
  }

  async fetchAllAttendence(req:Request,res:Response):Promise<void>{
    const data = await Attendence.findAll()

    if(data.length===0){
      res.status(404).json({
        message : "No attendence record"
      })
      return
    }

    res.status(200).json({
      message : "attendence record fetched successfully",
      data
    })
  }
}

export default new AttendenceController()