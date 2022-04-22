import { Board } from "./board";
import { Sprint } from "./sprint";

export interface SprintRepository {
    getFutures(board: Board): Promise<Sprint[]>
}
