import * as React from "react";
import {
    Code,
    ControlGroup,
    FormGroup,
    H3,
    InputGroup,
    Intent,
} from "@blueprintjs/core";
import {
    observer,
} from "mobx-react-lite";

import {
    ServiceAppFormI,
} from "@app/Types";
import ErrorIcon from "@app/Components/FormErrorIcon";

type Props = {
    /** Used as left-side details */
    children?: React.ReactNode,
    form: ServiceAppFormI,
};

const AppDetails = observer((props: Props) => {
    const onChangeName = (e: React.SyntheticEvent<HTMLInputElement>) => {
        props.form.name.onChange(e.currentTarget.value.replace(/\W/g, ""));
    };

    const onChangeAppRoot = (e: React.SyntheticEvent<HTMLInputElement>) =>
        props.form.appRoot.onChange(e.currentTarget.value);

    return (
        <div className="helper-form">
            <div className="left">
                <H3>Service Details</H3>

                {props.children}
            </div>

            <div className="right">
                <Name form={props.form} onChange={onChangeName} />

                <AppRoot form={props.form} onChange={onChangeAppRoot} />
            </div>
        </div>
    );
});

type FieldProps = {
    form: ServiceAppFormI,
    onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void,
}

const Name = observer((props: FieldProps) => {
    const error = props.form.name.error || props.form.nameInUse.error;

    return (
        <FormGroup
            inline
            label="Service Name"
            labelFor="name"
            labelInfo="*"
            intent={error ? Intent.DANGER : undefined}
        >
            <ControlGroup fill>
                <InputGroup
                    id="name"
                    placeholder="Service Name"
                    intent={error ? Intent.DANGER : undefined}
                    value={props.form.name.value}
                    onChange={props.onChange}
                />

                <ErrorIcon hasError={!!error} />
            </ControlGroup>

            <div className="helper-text">{error}</div>

            <p className="mt-2">
                Must be unique to each Project. You can leave it as default.
            </p>
        </FormGroup>
    );
});

const AppRoot = observer((props: FieldProps) =>
    <FormGroup
        inline
        label="Path to App Root"
        labelFor="appRoot"
        labelInfo="*"
        intent={props.form.appRoot.error ? Intent.DANGER : undefined}
        className="mb-0"
    >
        <ControlGroup fill>
            <InputGroup
                id="appRoot"
                placeholder="Path to App Root"
                intent={props.form.appRoot.error ? Intent.DANGER : undefined}
                value={props.form.appRoot.value}
                onChange={props.onChange}
            />

            <ErrorIcon hasError={!!props.form.appRoot.error} />
        </ControlGroup>

        <div className="helper-text">{props.form.appRoot.error}</div>

        <p className="mt-2">
            Location of your project files on host machine.
            The contents will be made available inside the container
            at <Code>/var/www</Code>.
        </p>

        <p className="mt-2">
            Windows users: You must use forward-slash&nbsp;
            <Code>c:/dev/my-project</Code> or
            double back-slash <Code>c:\\dev\\my-project</Code>.
        </p>
    </FormGroup>,
);

export default AppDetails;
