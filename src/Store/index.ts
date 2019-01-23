import * as React from "react";
import {
    RouterStore,
} from 'mobx-react-router';

import ProjectStore from "@app/Store/ProjectStore";
import ServiceStore from "@app/Store/ServiceStore";

const stores = {
    projectStore: new ProjectStore(),
    routingStore: new RouterStore(),
    serviceStore: new ServiceStore(),
};

const StoreContext = React.createContext(stores);

export default StoreContext;
export {
    stores,
};
