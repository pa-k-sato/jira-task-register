import { SpringId } from "../domains/sprint";
import { TaskKey } from "../domains/task";
import { TaskMoveService } from "../domains/taskMoveService";

export class MoveTaskUsecase {
    constructor(readonly moveTaskService: TaskMoveService){}

    async exec(springId: number, tasks: string[]) {
        await this.moveTaskService.moveTo(
            new SpringId(springId),
            tasks.map((v) => new TaskKey(v))
        );
    }
}