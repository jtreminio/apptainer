import * as React from "react";
import {
    observer,
} from "mobx-react-lite";
import {
    Route,
    Switch,
    withRouter,
} from "react-router-dom";
import PropTypes from "prop-types"

import "@app/style/index.scss";
import {
    BootstrapSize,
    Footer,
    Sidebar,
    Topbar,
} from "@app/Components";
import wrapper from "@app/Components/ComponentWrapper";
import Home    from "@app/Page/Home";
import Project from "@app/Page/Project";
import Service from "@app/Page/Service";

// proptypes complains Route.path must match only string
// @ts-ignore
// tslint:disable-next-line
Route.propTypes = Route.propTypes & {
    path: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

const App = observer(() =>
    <>
        <BootstrapSize />

        <Topbar />

        <div id="contents">
            <Sidebar />

            <main>
                <div className="page">
                    <Switch>
                        <Route component={wrapper(Home)} exact path="/" />

                        <Route component={wrapper(Service)} path={[
                            "/project/:projectId/service",
                        ]} />

                        <Route component={wrapper(Project)} path={[
                            "/project",
                        ]} />
                    </Switch>
                </div>

                <Footer />
            </main>
        </div>
    </>,
);

export default withRouter(App);
