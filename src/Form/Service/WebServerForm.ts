import {
    FieldState,
    FormState,
} from "formstate";

import {
    ServiceVhostFormI,
} from "@app/Types";
import {
    MaxLength,
    MinLength,
    Required,
} from "@app/Validator";
import Service from "@app/Entity/Service";
import ServiceForm from "@app/Form/ServiceForm";

export default class WebServerForm extends ServiceForm implements ServiceVhostFormI {
    public appRoot = new FieldState("")
        .validators(value => {
            return Required({value}) ||
                MinLength({value, length: 2}) ||
                MaxLength({value, length: 128});
        });

    public vhost = new FieldState("")
        .validators(value => {
            return Required({value}) ||
                MinLength({value, length: 3}) ||
                MaxLength({value, length: 50});
        });

    public vhostData = new FieldState("");

    public form = new FormState({
        name: this.name,
        nameInUse: this.nameInUse,
        version: this.version,
        type: this.type,
        appRoot: this.appRoot,
        vhost: this.vhost,
        vhostData: this.vhostData,
    });

    public fromService = (service: Service) => {
        this.name.value = service.name;
        this.type.value = service.type;
        this.version.value = service.version;

        this.appRoot.value = service.meta.appRoot;

        this.vhost.value = service.meta.vhost;
        this.vhostData.value = service.meta.vhostData;

        return this;
    };

    public toJson = () => ({
        appRoot: this.appRoot.$,
        vhost: this.vhost.$,
        vhostData: this.vhostData.$,
    });
}
