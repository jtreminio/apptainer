import * as React from "react";
import {
    Intent,
    Tag,
} from "@blueprintjs/core";

const BootstrapSize = () =>
    <div id="bootstrap-size">
        <Tag minimal intent={Intent.DANGER} large>
            <span className="d-block d-sm-none">xs</span>
            <span className="d-none d-sm-block d-md-none">sm</span>
            <span className="d-none d-md-block d-lg-none">md</span>
            <span className="d-none d-lg-block d-xl-none">lg</span>
            <span className="d-none d-xl-block">xl</span>
        </Tag>
    </div>
;

export default BootstrapSize;
