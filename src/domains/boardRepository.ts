import { Board } from "./board";
import { ProjectKey } from "./task";

export interface BoardRepository {
    get(projectKey: ProjectKey): Promise<Board>;
}