import * as React from "react";
import {
    Callout,
    Checkbox,
    Classes,
    Code,
    Collapse,
    H3,
    Intent,
} from "@blueprintjs/core";
import {
    observer,
} from "mobx-react-lite";

import {
    ini,
} from "@app/data/php";
import {
    ObjString_String,
} from "@app/Types";
import MultiSelectInput from "@app/Components/MultiSelectInput";
import Form             from "@app/Form/Service/PhpForm";

type Props = {
    form: Form,
};

const IniXdebug = observer((props: Props) => {
    const nameFormat = (name: string): string => name.replace("PHP.", "");

    const enableOnChange = () => props.form.xdebugEnabled.onChange(
        !props.form.xdebugEnabled.value,
    );

    const onSelect = (e: ObjString_String) => props.form.xdebug.onChange(e);

    return (
        <div className="helper-form">
            <div className="left">
                <H3>Xdebug INI</H3>

                <div className={Classes.TEXT_MUTED}>
                    <p><a href="https://github.com/jtreminio/php-docker/blob/master/Dockerfile-env#L597-L661"
                          target="_blank">Click here for all default values.</a></p>

                    <p>
                        Xdebug is installed <em>but not enabled for FPM</em> by default. It is always
                        available for CLI via <Code>$ xdebug</Code>. For example, you can use the
                        following to debug your programs via CLI:
                    </p>

                    <p><Code>$ xdebug foo.php</Code></p>
                </div>
            </div>

            <div className="right">
                <Checkbox
                    large
                    checked={props.form.xdebugEnabled.value}
                    label="Xdebug Enabled for Web Browser Debugging (Do NOT enable for production!)"
                    onChange={enableOnChange}
                />

                <Collapse isOpen={props.form.xdebugEnabled.value}>
                    <MultiSelectInput
                        data={ini.xdebug.data}
                        nameFormat={nameFormat}
                        selected={props.form.xdebug.value}
                        onSelect={onSelect}
                    />

                    <Callout intent={Intent.PRIMARY}>
                        Leave <Code>xdebug.remote_host</Code> as <Code>dockerhost</Code> which is a
                        special hostname provided
                        by <a href="https://github.com/qoomon/docker-host"
                              target="_blank">qoomon/docker-host</a> that
                        will be added to your Project. Use this instead
                        of <Code>host.docker.internal</Code> to connect to the host!
                    </Callout>
                </Collapse>
            </div>
        </div>
    );
});

export default IniXdebug;
