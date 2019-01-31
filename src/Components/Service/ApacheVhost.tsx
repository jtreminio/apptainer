import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import * as React from "react";
import {
    Card,
    ControlGroup,
    FormGroup,
    H3,
    Icon,
    InputGroup,
    Intent,
    Tag,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";
import {
    observer,
} from "mobx-react-lite";
import {
    Controlled as CodeMirror,
} from "react-codemirror2";

import {
    ServiceVhostFormI,
} from "@app/Types";
import ApacheMode from "@app/data/apache-codemirror.js";
import ErrorIcon  from "@app/Components/FormErrorIcon";

type Props = {
    /** Used as left-side details */
    children?: React.ReactNode,
    form: ServiceVhostFormI,
};

const ApacheVhost = observer((props: Props) => {
    const vhostOnChange = (e: React.SyntheticEvent<HTMLInputElement>) =>
        props.form.vhost.onChange(e.currentTarget.value);

    const dataOnChange = (data: string) => dataUpdate(data);

    const dataUpdate = (data: string) => props.form.vhostData.onChange(data);

    const codeMirrorOptions = {
        mode: "apache",
        theme: "material",
        lineNumbers: true,
    };

    return (
        <div className="helper-form">
            <div className="left">
                <H3>Apache Virtual Host Config</H3>

                {props.children}
            </div>

            <div className="right">
                <Vhost form={props.form} onChange={vhostOnChange} />

                <div className="CodeMirror-container">
                    <CodeMirror
                        value={props.form.vhostData.value}
                        options={codeMirrorOptions}
                        defineMode={{name: "apache", fn: ApacheMode}}
                        onBeforeChange={(editor, data, value) => dataOnChange(value)}
                    />

                    <div className="corner-text">
                        <Card interactive={false} className="custom">
                            <Icon icon={IconNames.BUILD} /> Custom Config
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
});

type FieldProps = {
    form: ServiceVhostFormI,
    onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void,
}
const Vhost = observer((props: FieldProps) =>
    <FormGroup
        inline
        label="Server Hostname"
        labelFor="vhost"
        labelInfo="*"
        intent={props.form.vhost.error ? Intent.DANGER : undefined}
    >
        <ControlGroup fill>
            <InputGroup
                id="vhost"
                placeholder="awesome.localhost"
                intent={props.form.vhost.error ? Intent.DANGER : undefined}
                value={props.form.vhost.value}
                onChange={props.onChange}
            />

            <ErrorIcon hasError={!!props.form.vhost.error} />
        </ControlGroup>

        <div className="helper-text">{props.form.vhost.error}</div>

        <p className="mt-2">
            You will be able to access your app by going to&nbsp;
            {<Tag minimal>http://{props.form.vhost.value || "<blank>"}</Tag>}
        </p>
    </FormGroup>,
);

export default ApacheVhost;
