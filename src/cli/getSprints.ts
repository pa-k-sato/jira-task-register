import { Sprint } from "../domains/sprint";
import { ProjectKey } from "../domains/task";
import { BoardRepositoryImpl } from "../jira/boardRepositoryImpl";
import { SprintRepositoryImpl } from "../jira/sprintRepositoryImpl";
import { GetSprintsUsecase } from "../usecases/getSprintsUsecase";

const toSprintString = (s: Sprint ) => {
    const term = `begin=${s.term.begin},\tend: ${s.term.end}`;
    return `Id: ${s.id.value.toString()},\t${s.name},\t${term},\tgoal: ${s.goal}`;
}

(async () => {
    const usecase = new GetSprintsUsecase(new BoardRepositoryImpl(), new SprintRepositoryImpl());
    await usecase.exec(
        new ProjectKey(process.argv[2]),
        (sprints: Sprint[]) => {
            sprints.forEach(
                (s) => { console.log(toSprintString(s)); }
            );
        } );
})();
