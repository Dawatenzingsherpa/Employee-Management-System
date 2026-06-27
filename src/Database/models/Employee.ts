import { UUID } from 'sequelize'
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  
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

}
