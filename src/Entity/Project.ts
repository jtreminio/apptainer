import {
    observable,
} from "mobx";
import {
    persist,
} from "mobx-persist";
import cuid from "cuid";

import {
    stores,
} from "@app/Store";
import Service from "@app/Entity/Service";

export default class Project {
    @persist @observable
    protected Id = cuid();

    @persist @observable
    protected Name: string = "";

    @persist("object")
    protected Created = new Date();

    //

    get id(): string {
        return this.Id
    };

    set name(name: string) {
        this.Name = name
    };

    get name(): string {
        return this.Name
    };

    get created(): Date {
        return this.Created
    };

    //

    public addService = (service: Service) => {
        service.project = this;
        stores.serviceStore.add(service);
    };

    public removeService = (service: Service) => {
        stores.serviceStore.remove(service);
    };

    get services(): Service[] {
        return stores.serviceStore.findByProject(this);
    };
}
