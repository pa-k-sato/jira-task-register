import { ProjectKey } from "./task";

/**
 * 他にも取れる情報はあるが使いそうなものだけ定義しておく
 */
export class Board {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly projectKey: ProjectKey
    ) {}
}