import { where } from "sequelize";
import Performance from "../Database/models/Performance";
import { Request,Response } from "express";

class PerformanceController{
  async createPerformance(req:Request,res:Response):Promise<void>{
    const {attendence,quality,productivity,teamwork,employeeId} = req.body

    if(!attendence || !quality || !productivity || !teamwork ||!employeeId){
      res.status(400).json({
        message : "please provide attendence ,quality, productivity, teamwork,employeeId"
      })
      return
    }

    const totalScore = Number(attendence)+Number(quality)+Number(productivity)+Number(teamwork)
    let rating;
    if(totalScore>=90){
      rating = 'excellent'
    }else if(totalScore>=80){
      rating = 'good'
    }else if(totalScore>=70){
      rating = 'average'
    }else{
      rating = 'needs improvement'
    }

    const data = await Performance.create({
      employeeId,
      attendence,
      quality,
      productivity,
      teamwork,
      totalScore,
      rating
    })

    res.status(200).json({
      message : "Performance created successfully",
      data
    })
    
  }

  async fetchPerformance(req:Request,res:Response):Promise<void>{
    const data= await Performance.findAll()
    if(data.length===0){
      res.status(404).json({
        message : "no performance data"
      })
      return
    }

    res.status(200).json({
      message : "Performance fetched successfully",
      data
    })
  }

  async fetchSinlgePerformance(req:Request,res:Response):Promise<void>{
    const {id} = req.params
    const data= await Performance.findByPk(id as string)
    if(!data){
      res.status(404).json({
        message : "no data with that id"
      })
      return
    }

    res.status(200).json({
      message : "Performance fetched successfully",
      data
    })
  }

  async updatePerformance(req:Request,res:Response):Promise<void>{
    const {id} = req.params
    const {attendence,quality,productivity,teamwork} = req.body
    
    const totalScore = Number(attendence)+Number(quality)+Number(productivity)+Number(teamwork)
    let rating;
    if(totalScore>=90){
      rating = 'excellent'
    }else if(totalScore>=80){
      rating = 'good'
    }else if(totalScore>=70){
      rating = 'average'
    }else{
      rating = 'needs improvement'
    }

    const data= await Performance.findByPk(id as string)
    if(!data){
      res.status(404).json({
        message : "no data with that id"
      })
      return
    }

    await Performance.update({
      attendence,
      quality,
      productivity,
      teamwork,
      totalScore,
      rating
    },{
      where:{
        id
      }
    })



    

    res.status(200).json({
      message : "Performance updated successfully",
      
    })
  }


  async deletePerformance(req:Request,res:Response):Promise<void>{
    const {id} = req.params
    const data = await Performance.findByPk(id as string)
    if(!data){
      res.status(404).json({
        message : "no data with that id"
      })
      return
    }

    await Performance.destroy({
      where:{
        id
      }
    })

    res.status(200).json({
      message : "data deleted successfully"
    })

  }


}

export default new PerformanceController()