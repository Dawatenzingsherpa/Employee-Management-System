import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { decode } from "node:punycode";
import User from "../Database/models/User";
import { Role } from "../types/UserTypes";


interface AuthRequest extends Request{
  user?:{
    id:string,
    username : string,
    email : string,
    password : string,
    role : string
  }
}

class AuthMiddleware{
  async authentication(req:AuthRequest,res:Response,next:NextFunction):Promise<void>{
    const token = req.headers.authorization

    if(!token){
      res.status(404).json({
        message : "token not provided"
      })
      return
    }

    jwt.verify(token,'hahaha', async (err,decoded:any)=>{
      if(err){
        res.status(404).json({
          message : "invalid token",
        })
      }else{
        try {
          const userData = await User.findByPk(decoded.id)
          if(!userData){
            res.status(404).json({
              message : "no userdata with that token"
            })
            return
          }

          req.user = userData
          next()

         

          
        } catch (error) {
          console.log(error);
          res.status(404).json({
            message : "something went wrong",
          
          })
        }
      }
    })

  }

  restrictTo(...roles:Role[]){
    return (req:AuthRequest,res:Response,next:NextFunction)=>{
      let userRole = req.user?.role as Role;
      if(!roles.includes(userRole)){
        res.status(404).json({
          message : "you dont have permission"
        })
        return
      }else{
        next()

      }

    }
  }
}

export default new AuthMiddleware()