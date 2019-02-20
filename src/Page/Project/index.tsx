import * as React from "react";
import {
    Route,
    RouteComponentProps,
    Switch,
    withRouter,
} from "react-router-dom";
import {
    observer,
} from "mobx-react-lite";

import wrapper     from "@app/Components/ComponentWrapper";
import ProjectList from "@app/Page/Project/List";

type Props = RouteComponentProps<{ projectId: string }> & {}

const Service = observer((props: Props) => {
    return (
        <Switch>
            <Route component={wrapper(ProjectList)} exact path={[
                "/project/list",
            ]} />

            <Route component={wrapper(ProjectList)} />
        </Switch>
    );
});

export default withRouter(Service);
