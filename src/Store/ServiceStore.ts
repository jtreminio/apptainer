import cuid from "cuid";
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
    ServiceCategories,
} from "@app/data/service-categories";
import {
    stores,
} from "@app/Store";
import ServiceTypes from "@app/data/service-types";
import Project      from "@app/Entity/Project";
import Service      from "@app/Entity/Service";
import ServiceType  from "@app/Entity/ServiceType";
import Form         from "@app/Form/ServiceForm";

export default class ServiceStore {
    @persist("list", Service) @observable
    protected Services: Service[] = [];

    get services(): Service[] {
        return this.Services
    }

    @computed
    get current(): Service | undefined {
        const project = stores.projectStore.current;

        if (!project) {
            return undefined;
        }

        const match = matchPath(stores.routingStore.location.pathname, {
            path: "/project/:projectId/service/:serviceId",
        });

        if (!match) {
            return undefined;
        }

        // @ts-ignore
        return this.find(match.params.serviceId || "");
    }

    @action
    public add = (service: Service): number => {
        if (this.Services.some(s => s.id === service.id)) {
            return 0;
        }

        return this.Services.push(service)
    };

    public find = (id: string | undefined): Service | undefined => {
        return id ? this.services.find(s => s.id === id) : undefined;
    };

    public findByName = (name: string): Service | undefined => {
        const project = stores.projectStore.current;

        return this.services.find(s => {
            if (!project || s.projectId !== project.id) {
                return false;
            }

            return s.name.toLowerCase() === name.trim().toLowerCase();
        });
    };

    public findByProject = (project: Project): Service[] =>
        this.services.filter(s => s.projectId === project.id)
    ;

    @action
    public remove = (service: Service) =>
        this.Services = this.Services.filter(s => s.id !== service.id)
    ;

    @action
    public createFromForm = (form: Form): Service => {
        const service = new Service();
        service.project = stores.projectStore.current!;
        service.name = form.name.$;
        service.version = form.version.$;
        service.type = form.type.$;
        service.meta = form.toJson();

        this.add(service);

        return service;
    };

    @action
    public updateFromForm = (service: Service, form: Form): Service => {
        service.name = form.name.$;
        service.version = form.version.$;
        service.type = form.type.$;
        service.meta = form.toJson();

        this.remove(service);
        this.add(service);

        return service;
    };

    public generateName = (type: ServiceType, defaultName?: string) => {
        const project = stores.projectStore.current!;
        const baseName = defaultName || type.slug;

        const servicesNames = this.findByProject(project).map(s => {
            return s.name;
        });

        if (servicesNames.indexOf(baseName) === -1) {
            return baseName;
        }

        for (let i = 1; i < 999; i++) {
            // 1 -> 001
            let num = i < 10 ? `00${i}` : i.toString();
            // 10 -> 010
            num = i < 100 ? `0${i}` : num;

            const name = `${baseName}_${num}`;

            if (servicesNames.indexOf(name) === -1) {
                return name;
            }
        }

        return `${baseName}_${cuid()}`;
    };

    public getServiceTypeBySlug = (slug: keyof typeof ServiceTypes): ServiceType => {
        return ServiceTypes[slug];
    };

    /**
     * If provided version string matches a version in type, returns that,
     * else returns default version of type
     *
     * @param type
     * @param versionCheck
     */
    public matchVersion = (
        type: ServiceType,
        versionCheck: string | undefined,
    ): string => {
        const version = versionCheck || type.versions[0];

        return type.versions.indexOf(version) !== -1
            ? version
            : type.versions[0];
    };

    public serviceTypes = () => {
        return ServiceTypes;
    };

    public serviceCategories = () => {
        return ServiceCategories
    };
}
