export class SpringId {
    constructor(public readonly value: number) {}
}
export class Sprint {
    readonly id: SpringId
    readonly name: string
    readonly goal: string
    readonly term: SprintTerm

    constructor(id: SpringId, name: string, goal: string, term: SprintTerm) {
        this.id = id;
        this.name = name;
        this.goal = goal;
        this.term = term;
    }
}

export class SprintTerm {
    // 表示しかしないので string でもっておく
    constructor(readonly begin: string, readonly end: string ) {}
}