import * as React from "react";
import {
    Route,
    Switch,
} from "react-router-dom";
import PropTypes from "prop-types"

import wrapper                from "@app/Components/ComponentWrapper";
import Home                   from "@app/Page/Home";
import ServiceCreate          from "@app/Page/Service/Create";

import ServiceCreateNginx     from "@app/Page/Service/Create/Nginx";
import ServiceUpdateNginx     from "@app/Page/Service/Update/Nginx";

import ServiceCreateApache     from "@app/Page/Service/Create/Apache";
import ServiceUpdateApache     from "@app/Page/Service/Update/Apache";

import ServiceCreateNode      from "@app/Page/Service/Create/Node";
import ServiceCreateNodeNginx from "@app/Page/Service/Create/NodeNginx";

import ServiceUpdateNode      from "@app/Page/Service/Update/Node";
import ServiceUpdateNodeNginx from "@app/Page/Service/Update/NodeNginx";

import ServiceCreatePhp       from "@app/Page/Service/Create/Php";
import ServiceCreatePhpApache from "@app/Page/Service/Create/PhpApache";
import ServiceCreatePhpNginx  from "@app/Page/Service/Create/PhpNginx";

import ServiceUpdatePhp       from "@app/Page/Service/Update/Php";
import ServiceUpdatePhpApache from "@app/Page/Service/Update/PhpApache";
import ServiceUpdatePhpNginx  from "@app/Page/Service/Update/PhpNginx";

import ServiceCreateMariaDB   from "@app/Page/Service/Create/MariaDB";
import ServiceUpdateMariaDB   from "@app/Page/Service/Update/MariaDB";

import ServiceList            from "@app/Page/Service/List";

// proptypes complains Route.path must match only string
// @ts-ignore
// tslint:disable-next-line
Route.propTypes = Route.propTypes & {
    path: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

const Routes = () => {
    return (
        <div className="page">
            <Switch>
                <Route component={wrapper(Home)} exact path="/" />

                <Route component={wrapper(ServiceList)} exact path="/service" />

                <Route component={wrapper(ServiceCreate)} exact path="/service/create" />

            { /*** Nginx ***/ }
                <Route component={wrapper(ServiceCreateNginx)} path={[
                    "/service/create/nginx/:version",
                    "/service/create/nginx",
                ]} />
                <Route component={wrapper(ServiceUpdateNginx)} path={[
                    "/service/update/nginx/:id",
                ]} />

            { /*** Apache ***/ }
                <Route component={wrapper(ServiceCreateApache)} path={[
                    "/service/create/apache/:version",
                    "/service/create/apache",
                ]} />
                <Route component={wrapper(ServiceUpdateApache)} path={[
                    "/service/update/apache/:id",
                ]} />

            { /*** Node ***/ }
                <Route component={wrapper(ServiceCreateNode)} path={[
                    "/service/create/nodejs/:version",
                    "/service/create/nodejs",
                ]} />
                <Route component={wrapper(ServiceCreateNodeNginx)} path={[
                    "/service/create/nodejs-nginx/:version",
                    "/service/create/nodejs-nginx",
                ]} />

                <Route component={wrapper(ServiceUpdateNode)} path={[
                    "/service/update/nodejs/:id",
                ]} />
                <Route component={wrapper(ServiceUpdateNodeNginx)} path={[
                    "/service/update/nodejs-nginx/:id",
                ]} />

            { /*** PHP ***/ }
                <Route component={wrapper(ServiceCreatePhp)} path={[
                    "/service/create/php/:version",
                    "/service/create/php",
                ]} />
                <Route component={wrapper(ServiceCreatePhpApache)} path={[
                    "/service/create/php-apache/:version",
                    "/service/create/php-apache",
                ]} />
                <Route component={wrapper(ServiceCreatePhpNginx)} path={[
                    "/service/create/php-nginx/:version",
                    "/service/create/php-nginx",
                ]} />

                <Route component={wrapper(ServiceUpdatePhp)} path={[
                    "/service/update/php/:id",
                ]} />
                <Route component={wrapper(ServiceUpdatePhpApache)} path={[
                    "/service/update/php-apache/:id",
                ]} />
                <Route component={wrapper(ServiceUpdatePhpNginx)} path={[
                    "/service/update/php-nginx/:id",
                ]} />

            { /*** MariaDB ***/ }
                <Route component={wrapper(ServiceCreateMariaDB)} path={[
                    "/service/create/mariadb/:version",
                    "/service/create/mariadb",
                ]} />
                <Route component={wrapper(ServiceUpdateMariaDB)} path={[
                    "/service/update/mariadb/:id",
                ]} />
            </Switch>
        </div>
    );
};

export default Routes;
