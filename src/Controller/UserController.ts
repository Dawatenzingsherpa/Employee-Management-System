import User from "../Database/models/User";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { Request,Response } from "express"; 
import { RegistrationData } from "../types/UserTypes";

class UserController{
  async registerUser(req:Request,res:Response):Promise<void>{
    const {username,email,password,role}:RegistrationData= req.body

    if(!email||!password||!role){
      res.status(404).json({
        message : "please provide email, password, role"
      })
      return
    }

    const data = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password,8),
      role
    })

    res.status(200).json({
      message : "user registered successfully",
      data
    })

  }

  async loginUser(req:Request,res:Response):Promise<void>{
    const {email,password} = req.body;
    if(!email || !password){
      res.status(400).json({
        message : "please provide email and password"
      })
      return
    }

    const [data] = await User.findAll({
      where : {
        email 
      }
    })

    if(!data){
      res.status(404).json({
        message : "no user with that email "
      })
      return
    }

    const isMatched = bcrypt.compareSync(password,data.password);

    if(!isMatched){
      res.status(200).json({
        message : "Invalid Email and password"
      })
      return
    }else{
      const token = jwt.sign({id : data.id},"hahaha",{
        expiresIn : "1d"
      })

      res.status(200).json({
        message : "user login successfully",
        data : token
      })
    }
  }
}

export default new UserController()