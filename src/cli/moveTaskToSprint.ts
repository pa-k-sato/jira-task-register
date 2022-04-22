import { TaskMoveServiceImpl } from "../jira/taskMoveServiceImpl";
import { MoveTaskUsecase } from "../usecases/moveTaskUsecase";

class ArgumentsParser {
    readonly sprintId: number
    readonly issueKeys: string[]

    constructor() {
        if (process.argv.length < 4) throw Error('at least 2 arugments required');
        if (isNaN(Number(process.argv[2]))) throw Error('specify number at first argument');
        this.sprintId = parseInt(process.argv[2])
        this.issueKeys = process.argv.splice(3);
    }
}

(async () => {
    const parser = new ArgumentsParser();
    const usecase = new MoveTaskUsecase(new TaskMoveServiceImpl());
    await usecase.exec(parser.sprintId, parser.issueKeys)
})();
