import * as React from "react";
import {
    ControlGroup,
    FormGroup,
    H3,
    InputGroup,
    Intent,
    Tag,
} from "@blueprintjs/core";
import {
    observer,
} from "mobx-react-lite";

import {
    ServiceAppVhostFormI,
    VhostConfig,
} from "@app/Types";
import ApacheMode     from "@app/data/apache-codemirror.js";
import ErrorIcon      from "@app/Components/FormErrorIcon";
import SelectEditable from "@app/Components/SelectEditable";

type Props = {
    /** Used as left-side details */
    children?: React.ReactNode,
    form: ServiceAppVhostFormI,
    allVhosts: VhostConfig[],
};

const ApacheAppVhost = observer((props: Props) => {
    const vhostOnChange = (e: React.SyntheticEvent<HTMLInputElement>) =>
        props.form.vhost.onChange(e.currentTarget.value);

    const dataOnChange = (data: string) => dataUpdate(data);

    const dataUpdate = (data: string) => props.form.vhostData.onChange(data);

    const selectedUpdate = (type: string, data?: string) => {
        const selected = props.allVhosts.find(v => v.type === type) as VhostConfig;

        props.form.vhostType.onChange(selected.type);
        dataUpdate(data || selected.data);
    };

    return (
        <div className="helper-form">
            <div className="left">
                <H3>Apache Virtual Host Config</H3>

                {props.children}
            </div>

            <div className="right">
                <Vhost form={props.form} onChange={vhostOnChange} />

                <SelectEditable
                    selected={props.form.vhostType.value}
                    allRecords={props.allVhosts}
                    editButtonTarget="custom"
                    selectOnChange={selectedUpdate}
                    dataOnChange={dataOnChange}
                    validationError={props.form.vhostType.error}
                    formGroupProps={{
                        label: "Select App Type",
                        labelFor: "vhostType",
                        labelInfo: "*",
                        inline: true,
                    }}
                    editorDefineMode={{name: "apache", fn: ApacheMode}}
                    editorProps={{
                        mode: "apache",
                        theme: "material",
                        lineNumbers: true,
                    }}
                />
            </div>
        </div>
    );
});

type FieldProps = {
    form: ServiceAppVhostFormI,
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

export default ApacheAppVhost;
