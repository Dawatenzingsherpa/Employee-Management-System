import { ForeignKey, Sequelize } from "sequelize-typescript";
import Department from "./models/Department";
import Employee from "./models/Employee";
import Attendence from "./models/Attendence";
import LeaveRequest from "./models/LeaveRequest";
import Performance from "./models/Performance";

const sequelize = new Sequelize({
  database : process.env.DB_NAME!,
  dialect : 'mysql',
  username : process.env.DB_USERNAME!,
  password : process.env.DB_PASSWORD!,
  host : process.env.DB_HOST!,
  port : Number(process.env.DB_PORT!),
  models : [__dirname + "/models"]
})


sequelize.authenticate()
.then(()=>{
  console.log('connected')
}).catch((error)=>{
  console.log(error);
})

sequelize.sync({alter : false}).then(()=>{
  console.log("Synced");
})


//relationship
Department.hasMany(Employee,{foreignKey : "departmentId"});
Employee.belongsTo(Department,{foreignKey:"departmentId"})

Employee.hasMany(Attendence,{foreignKey:"employeeId"});
Attendence.belongsTo(Employee,{foreignKey : "employeeId"})


Employee.hasMany(LeaveRequest,{foreignKey:"employeeId"});
LeaveRequest.belongsTo(Employee,{foreignKey : "employeeId"})

Employee.hasMany(Performance,{foreignKey: "employeeId"});
Performance.belongsTo(Employee,{foreignKey:"employeeId"})



export default sequelize
