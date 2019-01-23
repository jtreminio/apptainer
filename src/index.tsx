import * as React    from "react";
import * as ReactDOM from "react-dom";
import {
    syncHistoryWithStore,
} from "mobx-react-router";
import {
    Router,
} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import * as serviceWorker from "@app/serviceWorker";
import {
    stores,
} from "@app/Store";
import App  from "@app/App";
import init from "@app/InitStore";

init().then(() => {
    console.log("Loading React");

    const browserHistory = createBrowserHistory();
    const history = syncHistoryWithStore(browserHistory, stores.routingStore);

    // const {whyDidYouUpdate} = require('why-did-you-update');
    // whyDidYouUpdate(React);

    ReactDOM.render(
        <Router history={history}>
            <App />
        </Router>
        , document.getElementById("root"),
    );

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();
});
