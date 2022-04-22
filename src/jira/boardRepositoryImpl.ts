import { Board } from "../domains/board";
import { BoardRepository } from "../domains/boardRepository";
import { ProjectKey } from "../domains/task";
import { JiraApiClient } from "./jiraApiClient";

export class BoardRepositoryImpl implements BoardRepository {
    readonly apiClient: JiraApiClient = new JiraApiClient();

    async get(projectKey: ProjectKey): Promise<Board> {
        const res = await this.apiClient.get(
            '/rest/agile/1.0/board',
            {
                projectKeyOrId: projectKey.value
            }
        );

        const values = res.data.values as any;
        return new Board(
            values.id,
            values.name,
            projectKey
        );
    }
}
