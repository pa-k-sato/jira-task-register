import { Task } from "./task";

export interface TaskRepository {
    getAll(): Task[];
}