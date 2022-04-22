export class ProjectKey {
    constructor(public readonly value: string) {}
}

export class TaskKey {
    constructor(public readonly value: string) {}
}

/**
 * プロジェクトと紐付いたタスク（ Jira に登録されている、という意味ではない）
 */
export class ProjectTask {
    constructor(
        public readonly projectKey: ProjectKey,
        private readonly task: Task
    ) {}

    get summary(): string { return this.task.summary; }
    get description(): string { return this.task.description; }
    get issueTypeName(): string { return this.task.issueTypeName; }
    get storyPoint(): number { return this.task.storyPoint; }

}

/**
 * プロジェクトに紐づく前のタスク
 */
export class Task {
    constructor(
        public readonly summary: string,
        public readonly description: string,
        public readonly issueTypeName: string,
        public readonly storyPoint: number
    ) {}
}
