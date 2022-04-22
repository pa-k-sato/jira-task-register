import { ProjectKey, ProjectTask, TaskKey } from "../domains/task";
import { ProjectTaskRepository } from "../domains/projectTaskRepository";
import { TaskRepository } from "../domains/taskRepository";

export class CreateTaskUsecase {
    constructor(
        readonly projectTaskRepository: ProjectTaskRepository,
        readonly taskRepository: TaskRepository
    ) {}

    async exec(projectKey: ProjectKey, presenter: Function) {
        const tasks = this.taskRepository.getAll();
        const taskKeyPromises = tasks.map(async (task): Promise<TaskKey> => {
            return await this.projectTaskRepository.post(
                    new ProjectTask(projectKey, task)
                );
        });
        const taskKeys = await Promise.all(taskKeyPromises);
        presenter(taskKeys);
    }
}
