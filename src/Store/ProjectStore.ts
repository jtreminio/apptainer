import {
    action,
    computed,
    observable,
} from "mobx";
import {
    persist,
} from "mobx-persist";
import {
    matchPath,
} from "react-router-dom";

import {
    stores,
} from "@app/Store";
import Project from "@app/Entity/Project";
import Form    from "@app/Form/ProjectForm";

export default class ProjectStore {
    @persist("list", Project) @observable
    protected Projects: Project[] = [];

    @computed
    get current(): Project | undefined {
        const match = matchPath(stores.routingStore.location.pathname, {
            path: "/project/:projectId",
        });

        if (!match) {
            return undefined;
        }

        // @ts-ignore
        return this.find(match.params.projectId || "");
    }

    get projects(): Project[] {
        return this.Projects
    }

    @action
    public add = (project: Project): number => this.Projects.push(project);

    public find = (id: string): Project | undefined => {
        return this.Projects.find(p => p.id === id)
    };

    @action
    public remove = (project: Project) => {
        this.Projects = this.Projects.filter(p => p.id !== project.id)
    };

    @action
    public createFromForm = (form: Form): Project => {
        const project = new Project();
        project.name = form.name.value;

        this.Projects.push(project);

        return project;
    };
}
