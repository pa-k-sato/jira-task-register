import { BoardRepository } from "../domains/boardRepository";
import { SprintRepository } from "../domains/sprintRepository";
import { ProjectKey } from "../domains/task";

export class GetSprintsUsecase {
    constructor(
        private readonly boardRepository: BoardRepository,
        private readonly sprintRepository: SprintRepository,
    ) {}

    async exec(projectKey: ProjectKey, presenter: Function) {
        const board = await this.boardRepository.get(projectKey);
        const sprints = await this.sprintRepository.getFutures(board);
        presenter(sprints)
    }
}