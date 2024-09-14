import { Status } from "../enums/status";
import { Priority } from '../enums/priority';

export interface ToDo{
  id: number,
  title: string,
  description: string,
  status: Status,
  priority: Priority
  date: Date;
}
