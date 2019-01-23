import {
    FieldState,
    FormState,
} from "formstate";

import {
    ServiceAppFormI,
} from "@app/Types";
import {
    MaxLength,
    MinLength,
    Required,
} from "@app/Validator";
import Service     from "@app/Entity/Service";
import ServiceForm from "@app/Form/ServiceForm";

export default class NodeForm extends ServiceForm implements ServiceAppFormI {
    public appRoot = new FieldState("")
        .validators(value => {
            return Required({value}) ||
                MinLength({value, length: 2}) ||
                MaxLength({value, length: 128});
        });

    public command = new FieldState("")
        .validators(value => {
            return Required({value}) ||
                MinLength({value, length: 2}) ||
                MaxLength({value, length: 128});
        });

    public form = new FormState({
        name: this.name,
        nameInUse: this.nameInUse,
        version: this.version,
        type: this.type,
        appRoot: this.appRoot,
        command: this.command,
    });

    public fromService = (service: Service) => {
        this.name.value = service.name;
        this.type.value = service.type;
        this.version.value = service.version;

        this.appRoot.value = service.meta.appRoot;
        this.command.value = service.meta.command;

        return this;
    };

    public toJson = () => ({
        appRoot: this.appRoot.$,
        command: this.command.$,
    });
}
