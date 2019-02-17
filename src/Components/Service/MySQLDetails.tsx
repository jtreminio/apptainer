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
    ServiceSqlFormI,
} from "@app/Types";
import ErrorIcon from "@app/Components/FormErrorIcon";

type Props = {
    /** Used as left-side details */
    children?: React.ReactNode,
    form: ServiceSqlFormI,
};

const MySQLDetails = observer((props: Props) => {
    const onChangeName = (e: React.SyntheticEvent<HTMLInputElement>) => {
        props.form.name.onChange(e.currentTarget.value.replace(/\W/g, ""));
    };

    const onDbNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        props.form.dbName.onChange(e.currentTarget.value);
    };

    const onDbUserChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        props.form.dbUser.onChange(e.currentTarget.value);
    };

    const onDbPwChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        props.form.dbPw.onChange(e.currentTarget.value);
    };

    return (
        <div className="helper-form">
            <div className="left">
                <H3>Service Details</H3>

                {props.children}
            </div>

            <div className="right">
                <Name form={props.form} onChange={onChangeName} />

                <DbName form={props.form} onChange={onDbNameChange} />
                <DbUser form={props.form} onChange={onDbUserChange} />
                <DbPw form={props.form} onChange={onDbPwChange} />
            </div>
        </div>
    );
});

type FieldProps = {
    form: ServiceSqlFormI,
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

const DbName = observer((props: FieldProps) => {
    const error = props.form.dbName.error;

    return (
        <FormGroup
            inline
            label="Database Name"
            labelFor="dbName"
            labelInfo="*"
            intent={error ? Intent.DANGER : undefined}
        >
            <ControlGroup fill>
                <InputGroup
                    id="dbName"
                    placeholder="Database Name"
                    intent={error ? Intent.DANGER : undefined}
                    value={props.form.dbName.value}
                    onChange={props.onChange}
                />

                <ErrorIcon hasError={!!error} />
            </ControlGroup>

            <div className="helper-text">{error}</div>

            <p className="mt-2">
                The name of the database to be created.
            </p>
        </FormGroup>
    );
});

const DbUser = observer((props: FieldProps) => {
    const error = props.form.dbUser.error;

    return (
        <FormGroup
            inline
            label="Database User"
            labelFor="dbUser"
            labelInfo="*"
            intent={error ? Intent.DANGER : undefined}
        >
            <ControlGroup fill>
                <InputGroup
                    id="dbUser"
                    placeholder="Database User"
                    intent={error ? Intent.DANGER : undefined}
                    value={props.form.dbUser.value}
                    onChange={props.onChange}
                />

                <ErrorIcon hasError={!!error} />
            </ControlGroup>

            <div className="helper-text">{error}</div>

            <p className="mt-2">
                The name of the user with <Code>GRANT ALL</Code> access
                to the above database.
            </p>
        </FormGroup>
    );
});

const DbPw = observer((props: FieldProps) => {
    const error = props.form.dbPw.error;

    return (
        <FormGroup
            inline
            label="Database Password"
            labelFor="dbPw"
            labelInfo="*"
            intent={error ? Intent.DANGER : undefined}
            className="mb-0"
        >
            <ControlGroup fill>
                <InputGroup
                    id="dbPw"
                    placeholder="Database Password"
                    intent={error ? Intent.DANGER : undefined}
                    value={props.form.dbPw.value}
                    onChange={props.onChange}
                />

                <ErrorIcon hasError={!!error} />
            </ControlGroup>

            <div className="helper-text">{error}</div>

            <p className="mt-2">
                The password for the above user.
            </p>
        </FormGroup>
    );
});

export default MySQLDetails;
