import {
    Categories,
} from "@app/data/service-categories";
import {
    ObjectFields,
} from "@app/Types";

export default class ServiceType {
    constructor(props?: ObjectFields<ServiceType>) {
        Object.assign(this, props);
    }

    public readonly name: string;

    public readonly image: string;

    public readonly slug: string;

    public readonly organization: string;

    public readonly category: Categories[];

    public readonly versions: string[];

    public readonly description: string;

    public readonly url: string;

    public readonly logo: string;
}
