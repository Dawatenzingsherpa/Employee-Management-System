import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "leaveRequests",
  modelName: "LeaveRequest",
  timestamps: true,
})
class LeaveRequest extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare date: string;

  @Column({
    type: DataType.STRING,
  })
  declare leaveDate: string;

  @Column({
    type: DataType.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
  })
  declare requestStatus: string;
}

export default LeaveRequest;
