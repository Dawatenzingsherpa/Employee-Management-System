export interface Login {
  email: string;
  password: string;
}

export interface UserData extends Login {
  username?: string;
  role?: string;
}
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface Auth {
  user: UserData;
  status: Status;
  token: string;
}
