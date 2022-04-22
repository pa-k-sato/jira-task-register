import { Board } from "../domains/board";
import { SpringId, Sprint, SprintTerm } from "../domains/sprint";
import { SprintRepository } from "../domains/sprintRepository";
import { JiraApiClient } from "./jiraApiClient";

export class SprintRepositoryImpl implements SprintRepository {
    readonly apiClient: JiraApiClient = new JiraApiClient();

    async getFutures(board: Board): Promise<Sprint[]> {
        const res = await this.apiClient.get(
            '/rest/agile/1.0/board/20/sprint',
            {
                maxResults: 5,
                state: "future"
            }
        );

        const values = res.data.values as any[];
        return values.map((v) => {
            return new Sprint(
                new SpringId(v.id),
                v.name,
                v.goal,
                new SprintTerm(v.startDate, v.endDate)
            )
        });
    }
}