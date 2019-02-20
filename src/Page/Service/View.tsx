import * as React from "react";
import {
    observer,
} from "mobx-react-lite";
import {
    Redirect,
    Route,
    RouteComponentProps,
    Switch,
    withRouter,
} from "react-router-dom";

import wrapper      from "@app/Components/ComponentWrapper";
import Project      from "@app/Entity/Project";
import Service      from "@app/Entity/Service";
import Apache       from "@app/Page/Service/View/Apache";
import MariaDB      from "@app/Page/Service/View/MariaDB";
import MySQL        from "@app/Page/Service/View/MySQL";
import Nginx        from "@app/Page/Service/View/Nginx";
import Node         from "@app/Page/Service/View/Node";
import NodeNginx    from "@app/Page/Service/View/NodeNginx";
import Php          from "@app/Page/Service/View/Php";
import PhpApache    from "@app/Page/Service/View/PhpApache";
import PhpNginx     from "@app/Page/Service/View/PhpNginx";
import StoreContext from "@app/Store";

type Props = RouteComponentProps<{ projectId: string, serviceId?: string }> & {}

const View = observer((props: Props) => {
    const stores = React.useContext(StoreContext);

    const [project] = React.useState(() => {
        return stores.projectStore.find(props.match.params.projectId) as Project
    });

    const [service] = React.useState(() => {
        return stores.serviceStore.find(props.match.params.serviceId) as Service
    });

    if (!service || service.project !== project) {
        console.log(`Service ID ${props.match.params.serviceId} not found`);

        stores.routingStore.push(`/project/${project.id}/service`);
    }

    const basePath = "/project/:projectId/service/:serviceId";

    return (
        <Switch>
            <Route component={wrapper(Apache)} exact path={[
                `${basePath}/apache`,
            ]} />
            <Route component={wrapper(MariaDB)} exact path={[
                `${basePath}/mariadb`,
            ]} />
            <Route component={wrapper(MySQL)} exact path={[
                `${basePath}/mysql`,
            ]} />
            <Route component={wrapper(Nginx)} exact path={[
                `${basePath}/nginx`,
            ]} />
            <Route component={wrapper(Node)} exact path={[
                `${basePath}/nodejs`,
            ]} />
            <Route component={wrapper(NodeNginx)} exact path={[
                `${basePath}/nodejs-nginx`,
            ]} />
            <Route component={wrapper(Php)} exact path={[
                `${basePath}/php`,
            ]} />
            <Route component={wrapper(PhpApache)} exact path={[
                `${basePath}/php-apache`,
            ]} />
            <Route component={wrapper(PhpNginx)} exact path={[
                `${basePath}/php-nginx`,
            ]} />

            <Redirect
                to={`/project/${project.id}/service/${service.id}/${service.type.slug}`}
            />
        </Switch>
    );
});

export default withRouter(View);
