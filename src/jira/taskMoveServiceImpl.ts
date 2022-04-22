import axios from "axios";
import { SpringId } from "../domains/sprint";
import { TaskKey } from "../domains/task";
import { TaskMoveService } from "../domains/taskMoveService";
import { JiraApiClient } from "./jiraApiClient";

export class TaskMoveServiceImpl implements TaskMoveService {
    readonly apiClient: JiraApiClient = new JiraApiClient();

    async moveTo(springId: SpringId, tasks: TaskKey[]): Promise<void> {
        try {
            const ret = await this.apiClient.post(
                `/rest/agile/1.0/sprint/${springId.value}/issue`,
                {
                    issues: tasks.map((t) => t.value)
                },
            );
            console.log(ret.data);

        } catch (err: any) {
            const res = err.response;
            console.log(res.status, res.data, res.config);

            throw Error("タスク移動エラー")
        }
    }
}