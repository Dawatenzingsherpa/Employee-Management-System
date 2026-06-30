export interface RegistrationData{
  username : string,
  email : string,
  password : string,
  role : Role
}

export enum Role {
  Employee = 'employee',
  Admin = 'admin'
}