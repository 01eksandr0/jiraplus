import { IUser } from "./user";

export interface IProject {
  name: string;
  _id: string;
  owner: string;
  users: IUser[];
}
