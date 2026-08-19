import { UUID } from 'sequelize'
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  
} from 'sequelize-typescript'

@Table({
  tableName : 'employees',
  modelName : "Employee",
  timestamps : true
})

class Employee extends Model{
  @Column({
    primaryKey : true,
    type: DataType.UUID,
    defaultValue : DataType.UUIDV4
  })
  declare id : string

  @Column({
    type : DataType.STRING,
    allowNull : false
  })
  declare firstName : string



  @Column({
    type : DataType.STRING,
    allowNull : false
  })
  declare lastName : string

  @Column({
    type : DataType.STRING,
    allowNull : false
  })
  declare email: string

  @Column({
    type : DataType.STRING(10),
    validate : {
      len : {
        args : [10,10],
        msg : "phone number should be 10 digits"
      }
    },
    allowNull : false
  })
  declare phoneNumber : string

  @Column({
    type : DataType.STRING,
    allowNull : false
  })
  declare hireDate : string

  
  @Column({
    type : DataType.INTEGER,
    allowNull : false
  })
  declare salary : string

}

export default Employee
