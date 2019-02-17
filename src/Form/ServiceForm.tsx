import * as React from "react";
import {
    FieldState,
    FormState,
} from "formstate";

import {
    Jsonify,
    ObjectFields,
    ServiceBaseFormI,
} from "@app/Types";
import {
    MaxLength,
    MinLength,
    Required,
} from "@app/Validator";
import Service     from "@app/Entity/Service";
import ServiceType from "@app/Entity/ServiceType";

export default abstract class ServiceForm implements ServiceBaseFormI, Jsonify {
    public name = new FieldState("")
        .validators(value => {
            return Required({value}) ||
                MinLength({value, length: 2}) ||
                MaxLength({value, length: 50});
        });

    // Don't persist
    public nameInUse = new FieldState(false)
        .validators(value => {
            return value ? "Service Name already in use" : false;
        });

    public version = new FieldState("")
        .validators(value => {
            return Required({value});
        });

    public type = new FieldState<ServiceType | undefined>(undefined)
        .validators(value => {
            return !value ? "Service Type required" : false;
        }) as FieldState<ServiceType>;

    public form = new FormState({
        name: this.name,
        nameInUse: this.nameInUse,
        version: this.version,
        type: this.type,
    });

    public abstract toJson = () => ({});

    public fromService = (service: Service): this => {
        this.name.value = service.name;
        this.type.value = service.type;
        this.version.value = service.version;

        return this;
    };

    public fromObj = (props: ObjectFields<this>): this => {
        const setProps = props;

        for (const g of Object.keys(setProps)) {
            this[g].value = setProps[g];
        }

        return this;
    };

    public onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        await this.form.validate();
    };
}
