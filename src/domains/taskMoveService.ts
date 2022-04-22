import { SpringId } from "./sprint";
import { TaskKey } from "./task";

/**
 * SprintTask というモデルがあって、それのリポジトリに対して update するのが良いかも
 * ただ、どれが新規追加か、とかを見ることになりそうなので面倒？
 */
export interface TaskMoveService {
    moveTo(springId: SpringId, tasks: TaskKey[]): Promise<void>
}