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

import wrapper   from "@app/Components/ComponentWrapper";
import Apache    from "@app/Page/Service/Create/Apache";
import MariaDB   from "@app/Page/Service/Create/MariaDB";
import MySQL     from "@app/Page/Service/Create/MySQL";
import Nginx     from "@app/Page/Service/Create/Nginx";
import Node      from "@app/Page/Service/Create/Node";
import NodeNginx from "@app/Page/Service/Create/NodeNginx";
import Php       from "@app/Page/Service/Create/Php";
import PhpApache from "@app/Page/Service/Create/PhpApache";
import PhpNginx  from "@app/Page/Service/Create/PhpNginx";
import Select    from "@app/Page/Service/Create/Select";

type Props = RouteComponentProps<{ projectId: string }> & {}

const Create = observer((props: Props) => {
    const basePath = "/project/:projectId/service/create";

    return (
        <Switch>
            <Route component={wrapper(Apache)} exact path={[
                `${basePath}/apache/:version`,
                `${basePath}/apache`,
            ]} />
            <Route component={wrapper(MariaDB)} exact path={[
                `${basePath}/mariadb/:version`,
                `${basePath}/mariadb`,
            ]} />
            <Route component={wrapper(MySQL)} exact path={[
                `${basePath}/mysql/:version`,
                `${basePath}/mysql`,
            ]} />
            <Route component={wrapper(Nginx)} exact path={[
                `${basePath}/nginx/:version`,
                `${basePath}/nginx`,
            ]} />
            <Route component={wrapper(Node)} exact path={[
                `${basePath}/nodejs/:version`,
                `${basePath}/nodejs`,
            ]} />
            <Route component={wrapper(NodeNginx)} exact path={[
                `${basePath}/nodejs-nginx/:version`,
                `${basePath}/nodejs-nginx`,
            ]} />
            <Route component={wrapper(Php)} exact path={[
                `${basePath}/php/:version`,
                `${basePath}/php`,
            ]} />
            <Route component={wrapper(PhpApache)} exact path={[
                `${basePath}/php-apache/:version`,
                `${basePath}/php-apache`,
            ]} />
            <Route component={wrapper(PhpNginx)} exact path={[
                `${basePath}/php-nginx/:version`,
                `${basePath}/php-nginx`,
            ]} />

            <Route component={wrapper(Select)} />
        </Switch>
    );
});

export default withRouter(Create);
