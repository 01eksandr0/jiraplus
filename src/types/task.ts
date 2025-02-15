import { IComment } from "./comment";

export type Statuses = "todo" | "inprogress" | "qa" | "done";
export type Priorities = "low" | "medium" | "high";

export interface ITask {
  _id: string;
  creater: string;
  user?: string;
  project: string;
  status: Statuses;
  priority: Priorities;
  timesheet?: string;
  deadline?: string;
  title: string;
  description?: string;
  comments?: IComment[];
}
