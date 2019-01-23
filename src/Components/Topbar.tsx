import * as React from "react";
import {
    Alignment,
    AnchorButton,
    Navbar,
    NavbarGroup,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";
import {
    observer,
} from "mobx-react-lite";

type Props = {}

const Topbar = observer((props: Props) => {
    return (
        <header id="top-bar">
            <Navbar fixedToTop>
                <NavbarGroup align={Alignment.RIGHT}>
                    <AnchorButton
                        minimal
                        icon={IconNames.CHAT}
                        text="#dashtainer on Freenode"
                        href="https://kiwiirc.com/client/chat.freenode.net/#dashtainer"
                        target="_blank"
                    />

                    <AnchorButton
                        minimal
                        icon={IconNames.ISSUE}
                        text="Issues?"
                        href="https://github.com/jtreminio/dashtainer/issues"
                        target="_blank"
                    />

                    <AnchorButton
                        minimal
                        icon={IconNames.FORK}
                        text="Fork Me"
                        href="https://github.com/jtreminio/dashtainer"
                        target="_blank"
                    />

                    <AnchorButton
                        minimal
                        icon={IconNames.BRIEFCASE}
                        text="Hire Me!"
                        href="https://jtreminio.com/hire-me/"
                        target="_blank"
                    />
                </NavbarGroup>
            </Navbar>
        </header>
    );
});

export default Topbar;
