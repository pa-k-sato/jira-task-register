import * as fs from 'fs';
import { TaskRepository } from '../domains/taskRepository';
import { ProjectKey, Task } from '../domains/task';

class TaskMeatadata {
    readonly summary: string;
    readonly taskType: string;
    readonly storyPoint: number;

    constructor(filename: string) {
        const filenameDisassembly = filename.split('_');
        this.summary = filenameDisassembly[0];
        this.taskType = filenameDisassembly[1];
        this.storyPoint = parseInt(filenameDisassembly[2].split('.')[0]);
    }
}

export class TaskRepositoryImpl implements TaskRepository {
    constructor(
        private readonly taskFileFolder: string
    ) {}

    getAll(): Task[] {
        const files = fs.readdirSync(this.taskFileFolder);
        const tasks = files.map((file: string) => {
            const body = fs.readFileSync(`${this.taskFileFolder}/${file}`);
            const taskMeatadata = new TaskMeatadata(file);

            return new Task(
                taskMeatadata.summary,
                body.toString(),
                taskMeatadata.taskType,
                taskMeatadata.storyPoint
            )
        });

        return tasks;
    }
}
