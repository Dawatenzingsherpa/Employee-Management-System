import {
  Table,
  Column,
  Model,
  DataType
} from 'sequelize-typescript'


@Table({
  tableName : "attendence",
  modelName : 'Attendence',
  timestamps : true
})

class Attendence extends Model {
  @Column({
    primaryKey : true,
    type : DataType.UUID,
    defaultValue : DataType.UUIDV4

  })

  declare id : string

  @Column({
    type : DataType.STRING
  })
  declare date:string

  
  @Column({
    type :  DataType.DATE
  })
  declare checkIn:Date

  
  @Column({
    type :  DataType.DATE
  })
  declare checkOut: Date

  @Column({
    type : DataType.INTEGER

  })
  declare overtime : number


}

export default Attendence