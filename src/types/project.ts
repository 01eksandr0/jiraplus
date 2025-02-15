import { ITask } from "./task";
import { IUser } from "./user";

export interface IProject {
  name: string;
  _id: string;
  creater: string;
  users: IUser[];
  tasks?: ITask[];
}
