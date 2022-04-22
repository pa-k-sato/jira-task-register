import { ProjectTask, TaskKey } from "./task";

export interface ProjectTaskRepository {
    post(task: ProjectTask): Promise<TaskKey>
}