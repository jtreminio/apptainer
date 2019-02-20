import * as React from "react";
import {
    observer,
} from "mobx-react-lite";
import {
    Route,
    RouteComponentProps,
    Switch,
    withRouter,
} from "react-router-dom";

import wrapper       from "@app/Components/ComponentWrapper";
import Project       from "@app/Entity/Project";
import ServiceCreate from "@app/Page/Service/Create";
import ServiceList   from "@app/Page/Service/List";
import ServiceView   from "@app/Page/Service/View";
import StoreContext  from "@app/Store";

type Props = RouteComponentProps<{ projectId: string }> & {}

const Service = observer((props: Props) => {
    const stores = React.useContext(StoreContext);

    const [project] = React.useState(() =>
        stores.projectStore.find(props.match.params.projectId) as Project
    );

    if (!project) {
        console.log(`Project ID ${props.match.params.projectId} not found`);
        stores.routingStore.push("/project");
    }

    const basePath = "/project/:projectId/service";

    return (
        <Switch>
            <Route component={wrapper(ServiceList)} exact path={[
                `${basePath}/list`,
            ]} />

            <Route component={wrapper(ServiceCreate)} path={[
                `${basePath}/create`,
            ]} />

            <Route component={wrapper(ServiceView)} path={[
                `${basePath}/:serviceId`,
            ]} />

            <Route component={wrapper(ServiceList)} />
        </Switch>
    );
});

export default withRouter(Service);
