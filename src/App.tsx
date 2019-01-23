import * as React from "react";
import {
    observer,
} from "mobx-react-lite"
import {
    withRouter,
} from "react-router-dom";

import "@app/style/index.scss";
import {
    BootstrapSize,
    Footer,
    Sidebar,
    Topbar,
} from "@app/Components";
import Routes from "@app/Routes";

const App = observer(() =>
    <>
        <BootstrapSize />

        <Topbar />

        <div id="contents">
            <Sidebar />

            <main>
                <Routes />
                <Footer />
            </main>
        </div>
    </>,
);

export default withRouter(App);
