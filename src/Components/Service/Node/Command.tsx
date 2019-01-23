import * as React from "react";
import {
    ControlGroup,
    FormGroup,
    H3,
    InputGroup,
    Intent,
} from "@blueprintjs/core";
import {
    observer,
} from "mobx-react-lite";

import ErrorIcon from "@app/Components/FormErrorIcon";
import Form      from "@app/Form/Service/NodeForm";

type Props = {
    /** Used as left-side details */
    children?: React.ReactNode,
    form: Form,
};

const Command = observer((props: Props) => {
    const onCommandChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        props.form.command.onChange(e.currentTarget.value);
    };

    const error = props.form.command.error;

    return (
        <div className="helper-form">
            <div className="left">
                <H3>Startup Command</H3>
            </div>

            <div className="right">
                <FormGroup
                    inline
                    label="Command"
                    labelFor="command"
                    labelInfo="*"
                    intent={error ? Intent.DANGER : undefined}
                >
                    <ControlGroup fill>
                        <InputGroup
                            id="command"
                            placeholder="yarn run start"
                            intent={error ? Intent.DANGER : undefined}
                            value={props.form.command.value}
                            onChange={onCommandChange}
                        />

                        <ErrorIcon hasError={!!error} />
                    </ControlGroup>

                    <div className="helper-text">{error}</div>

                    <p className="mt-2">
                        Run your app with this command.
                    </p>
                </FormGroup>
            </div>
        </div>
    );
});

export default Command;
