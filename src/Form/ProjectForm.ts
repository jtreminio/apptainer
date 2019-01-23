import * as React from "react";
import {
    FormState,
    FieldState,
} from "formstate";
import {
    uniqueNamesGenerator,
} from "unique-names-generator";

import {
    ProjectBaseFormI,
} from "@app/Types";

import {
    MaxLength,
    MinLength,
    Required,
} from "@app/Validator";

export default class ProjectForm implements ProjectBaseFormI {
    public name = new FieldState(uniqueNamesGenerator("_", true))
        .validators(value => {
            return Required({value}) ||
                MinLength({value, length: 3}) ||
                MaxLength({value, length: 50});
        });

    public form = new FormState({
        name: this.name,
    });

    public onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        await this.form.validate();
    };
}
