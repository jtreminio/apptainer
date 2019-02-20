import {
    computed,
    observable,
} from "mobx";
import {
    persist,
} from "mobx-persist";
import cuid from "cuid";

import {
    stores,
} from "@app/Store";
import ServiceTypes from "@app/data/service-types";
import Project      from "@app/Entity/Project";
import ServiceType  from "@app/Entity/ServiceType";

export default class Service {
    @persist @observable
    protected Id = cuid.slug();

    @persist @observable
    protected Name: string = "";

    @persist @observable
    protected Version: string = "";

    @persist @observable
    protected Type: keyof typeof ServiceTypes;

    @persist("object") @observable
    protected Meta: { [key: string]: any } = {};

    @persist("object")
    protected Created = new Date();

    @persist @observable
    protected Project: string = "";

    //

    get id(): string {
        return this.Id
    };

    set name(name: string) {
        this.Name = name.trim()
    };

    get name(): string {
        return this.Name
    };

    set version(version: string) {
        this.Version = version
    };

    get version(): string {
        return this.Version
    };

    set type(type: ServiceType) {
        // @ts-ignore
        this.Type = type.slug
    };

    @computed
    get type(): ServiceType {
        return stores.serviceStore.getServiceTypeBySlug(this.Type)
    };

    set meta(meta: { [key: string]: any }) {
        this.Meta = meta
    };

    get meta() {
        return this.Meta
    };

    set project(project: Project) {
        this.Project = project.id
    };

    @computed
    get project(): Project {
        return stores.projectStore.find(this.Project) as Project;
    };

    get projectId(): string {
        return this.Project
    };

    get created(): Date {
        return this.Created
    };
}
