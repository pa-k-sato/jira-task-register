import 'dotenv/config';
import { ProjectTask, TaskKey } from "../domains/task";
import { ProjectTaskRepository} from "../domains/projectTaskRepository";
import { JiraApiClient } from "./jiraApiClient";

export class ProjectTaskRepositoryImpl implements ProjectTaskRepository {
    readonly apiClient: JiraApiClient = new JiraApiClient();

    async post(task: ProjectTask): Promise<TaskKey> {
        const hoge = process.env.JIRA_STORY_POINT_FIELD;
        const fields: any = {
            project: {
                key: task.projectKey.value
            },
            summary: task.summary,
            description: task.description,
            issuetype: {
                name: task.issueTypeName
            }
        };
        fields[process.env.JIRA_STORY_POINT_FIELD] = task.storyPoint;

        try {
            const ret = await this.apiClient.post(
                '/rest/api/2/issue/',
                {
                    fields: fields
                }
            );

            return new TaskKey(ret.data.key);
        } catch (err: any) {
            const res = err.response;
            console.error(res.status, res.data, res.config);

            throw Error("タスク作成エラー")
        }
    }

}
