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
import {
    RouteComponentProps,
    withRouter,
} from "react-router-dom";

import Project      from "@app/Entity/Project";
import SelectBundle from "@app/Page/Service/Create/SelectBundle";
import SelectCustom from "@app/Page/Service/Create/SelectCustom";
import StoreContext from "@app/Store";

type Props = RouteComponentProps<{ projectId: string }> & {}

const Select = observer((props: Props) => {
    const stores = React.useContext(StoreContext);

    const [project] = React.useState(() =>
        stores.projectStore.find(props.match.params.projectId) as Project
    );

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
                <Tab id="custom" panel={<SelectCustom project={project} />} />
                <Tab id="bundle" panel={<SelectBundle />} />
            </Tabs>
        </>
    );
});

export default withRouter(Select);
