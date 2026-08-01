import{
  Table,
  Column,
  Model,
  DataType
}from "sequelize-typescript"

@Table({
  tableName : "performances",
  modelName : "Performance",
  timestamps: true
})

class Performance extends Model{
  @Column({
    primaryKey : true,
    type : DataType.UUID,
    defaultValue : DataType.UUIDV4
  })
  declare id : string

  @Column({
    type : DataType.INTEGER,
    allowNull : false,
    validate:{
      min : 0,
      max : 20
    }
  })
  declare attendence : number


  @Column({
    type : DataType.INTEGER,
    allowNull : false,
    validate:{
      min : 0,
      max : 30
    }
  })
  declare quality: number

  @Column({
    type : DataType.INTEGER,
    allowNull : false,
    validate:{
      min : 0,
      max : 30
    }
  })
  declare productivity : number

  @Column({
    type : DataType.INTEGER,
    allowNull : false,
    validate:{
      min : 0,
      max : 20
    }
  })
  declare teamwork : number

  @Column({
    type : DataType.INTEGER,
    allowNull : false,
    validate:{
      min : 0,
      max : 100
    }
  })
  declare totalScore : number

  @Column({
    type : DataType.ENUM('excellent','good','average','needs improvement'),
    
  })
  declare rating:string
}

export default Performance