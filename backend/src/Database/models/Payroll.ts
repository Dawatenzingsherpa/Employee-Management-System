import{
  Table,
  Column,
  Model,
  DataType
}from "sequelize-typescript"

@Table({
  tableName : "payrolls",
  modelName : "Payroll",
  timestamps: true
})

class Payroll extends Model{
  @Column({
    primaryKey : true,
    type : DataType.UUID,
    defaultValue : DataType.UUIDV4
  })
  declare id : string

  @Column({
    type : DataType.INTEGER
  })
  declare basicSalary : number

  @Column({
    type : DataType.INTEGER
  })
  declare allowance : number

  @Column({
    type : DataType.INTEGER
  })
  declare overtimePay : number

  @Column({
    type : DataType.INTEGER
  })
  declare bonus:number

  @Column({
    type : DataType.INTEGER
  })
  declare deducation :number

  @Column({
    type : DataType.INTEGER
  })
  declare netPay:number

  
}

export default Payroll