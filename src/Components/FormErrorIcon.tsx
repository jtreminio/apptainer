import * as React from "react";
import {
    Icon,
    Intent,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";

type Props = {
    hasError: boolean,
};

const FormErrorIcon = (props: Props) =>
    <div className="error-icon">
        <Icon
            icon={props.hasError ? IconNames.ERROR : IconNames.BLANK}
            intent={props.hasError ? Intent.DANGER : undefined}
            iconSize={Icon.SIZE_LARGE}
        />
    </div>
;

export default FormErrorIcon;
