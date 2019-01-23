import * as React from "react";
import {
    Classes,
    H3,
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

const IniFpm = observer((props: Props) => {
    const nameFormat = (name: string): string => name.replace("FPM.", "");

    const onSelect = (e: ObjString_String) => props.form.fpm.onChange(e);

    return (
        <div className="helper-form">
            <div className="left">
                <H3>FPM Conf</H3>

                <div className={Classes.TEXT_MUTED}>
                    <p><a href="https://github.com/jtreminio/php-docker/blob/master/Dockerfile-env#L663-L675"
                          target="_blank">Click here for all default values.</a></p>
                </div>
            </div>

            <div className="right">
                <MultiSelectInput
                    data={ini.fpm.data}
                    nameFormat={nameFormat}
                    selected={props.form.fpm.value}
                    onSelect={onSelect}
                />
            </div>
        </div>
    );
});

export default IniFpm;
