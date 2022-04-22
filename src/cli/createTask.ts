import { ProjectKey, TaskKey } from "../domains/task";
import { ProjectTaskRepositoryImpl } from "../jira/projectTaskRepositoryImpl";
import { TaskRepositoryImpl } from "../fs/taskRepositoryImpl";
import { CreateTaskUsecase } from "../usecases/createTaskUsecase";
import * as fs from 'fs';


class ArgumentsParser {
    readonly folder: string
    readonly projectKey: string

    constructor() {
        if (process.argv.length < 4) throw Error('at least 2 arugments required');
        this.folder = process.argv[2];
        this.projectKey = process.argv[3];

        if (!fs.existsSync(this.folder)) throw Error(`folder: ${this.folder} is not exists!`);
    }
}


(async () => {
    const parser = new ArgumentsParser();
    const usecase = new CreateTaskUsecase(
        new ProjectTaskRepositoryImpl(),
        new TaskRepositoryImpl(parser.folder));

    await usecase.exec(new ProjectKey(parser.projectKey), (taskKeys: TaskKey[]) => {
        taskKeys.forEach(async (taskKey: TaskKey) => {
            console.log(`created task key: ${taskKey.value}`);
        });
    });
})();
