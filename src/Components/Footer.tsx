import * as React from "react";
import {
    Alignment,
    AnchorButton,
    Icon,
    Navbar,
    NavbarDivider,
    NavbarGroup,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";

const Footer = () =>
    <Navbar id="bottom-bar">
        <NavbarGroup align={Alignment.RIGHT}>
            <AnchorButton
                minimal
                href="https://jtreminio.com"
                target="_blank"
            >
                Made with
                <Icon className="mx-1" icon={IconNames.HEART} />
                by Juan Treminio
            </AnchorButton>

            <NavbarDivider />

            <AnchorButton
                minimal
                icon={IconNames.CODE}
                text="Github"
                href="https://github.com/jtreminio/dashtainer"
                target="_blank"
            />

            <NavbarDivider />

            <AnchorButton
                minimal
                icon={IconNames.COMMENT}
                text="Twitter"
                href="https://twitter.com/dashtainer"
                target="_blank"
            />

            <NavbarDivider />

            <AnchorButton
                minimal
                icon={IconNames.CHAT}
                text="IRC"
                href="https://kiwiirc.com/client/chat.freenode.net/#dashtainer"
                target="_blank"
            />
        </NavbarGroup>
    </Navbar>
;

export default Footer;
