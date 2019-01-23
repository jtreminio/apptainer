import * as React from "react";
import {
    Alignment,
    H1,
    Navbar,
    Tab,
    TabId,
    Tabs,
} from "@blueprintjs/core";
import {
    observer,
} from "mobx-react-lite";

import CreateBundle from "@app/Page/Service/CreateBundle";
import CreateCustom from "@app/Page/Service/CreateCustom";

type Props = {}

const Create = observer((props: Props) => {
    const [tab, setTab] = React.useState<React.ReactText>("custom");

    return (
        <>
            <div className="page-header">
                <H1>Create New Service</H1>
                <div className="page-options center">
                    <Navbar>
                        <Navbar.Group>
                            <Navbar.Heading>
                                Choose Type:
                            </Navbar.Heading>
                        </Navbar.Group>
                        <Navbar.Group align={Alignment.RIGHT}>
                            <Tabs id="create-service-tabs" animate large
                                  selectedTabId={tab}
                                  onChange={(tab: TabId) => setTab(tab)}
                            >
                                <Tab id="custom">Custom</Tab>
                                <Tab id="bundle">Bundle</Tab>
                            </Tabs>
                        </Navbar.Group>
                    </Navbar>
                </div>
            </div>

            <Tabs id="create-service-panels" selectedTabId={tab}
                  renderActiveTabPanelOnly={false}>
                <Tab id="custom" panel={<CreateCustom />} />
                <Tab id="bundle" panel={<CreateBundle />} />
            </Tabs>
        </>
    );
});

export default Create;
