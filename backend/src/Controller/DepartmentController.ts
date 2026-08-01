import Department from "../Database/models/Department";
import { Request,Response } from "express";

class DepartmentController{
  departmentData = [
  { departmentName: "Human Resources" },
  { departmentName: "Finance" },
  { departmentName: "Administration" },
  { departmentName: "Information Technology" },
  { departmentName: "Operations" }
];

  async departmentSeeder():Promise<void>{
    const data = await Department.findAll();
    if(data.length===0){
      const data = await Department.bulkCreate(this.departmentData)
      console.log(data);
      console.log('Departments seeded successfully')
    }else{
      console.log("Departments seeded already")
    }
  }

  async createDepartment(req:Request,res:Response):Promise<void>{
    const {departmentName} = req.body
    if(!departmentName){
      res.status(400).json({
        message : "please provide departmentName"
      })
      return
    }

    const data = await Department.create({
      departmentName
    })

    res.status(201).json({
      message : "Department created successfully"
    })
  }

  async getDepartments(req:Request,res:Response):Promise<void>{
    const data = await Department.findAll();
    if(data.length===0){
      res.status(404).json({
        message : "NO Department data"
      })
      return
    }

    res.status(200).json({
      message : "Data fetched successfully",
      data
    })
  }

   async getSingleDepartment(req:Request,res:Response):Promise<void>{
    
    const {id} = req.params
    const data = await Department.findAll({
      where : {
        id
      }
    });
    if(data.length===0){
      res.status(404).json({
        message : "NO Department data"
      })
      return
    }

    res.status(200).json({
      message : "Data fetched successfully",
      data
    })
  }


  async updateDepartment(req:Request,res:Response):Promise<void>{
    const {id} = req.params
    
    const {departmentName} = req.body
    const data = await Department.findByPk(id as string)
    

    if(!data){
      res.status(400).json({
        message : "no Department with that id"
      })
      return
    }

    data.departmentName = departmentName
    data.save()

    res.status(200).json({
      message : "Department updated successfully",
      data
    })
  }

  async deleteDepartment(req:Request,res: Response):Promise<void>{
    const {id} = req.params
    
    const data = await Department.findByPk(id as string)
    

    if(!data){
      res.status(400).json({
        message : "no Department with that id"
      })
      return
    }

    await Department.destroy({
      where : {
        id
      }
    })    

    res.status(200).json({
      message : "Department deleted successfully",
      
    })
  }
}

export default new DepartmentController()