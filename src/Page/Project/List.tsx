import * as React from "react";
import {
    H1,
    HTMLTable,
} from "@blueprintjs/core";
import {
    observer,
} from "mobx-react-lite";
import {
    Link,
} from "react-router-dom";

import StoreContext from "@app/Store";

type Props = {}

const Project = observer((props: Props) => {
    const stores = React.useContext(StoreContext);

    return (
        <>
            <div className="page-header">
                <H1>Projects</H1>
            </div>

            <HTMLTable condensed className="w-100 mt-2">
                <thead>
                <tr>
                    <th>Name</th>
                    <th># of Services</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {stores.projectStore.projects.map(project =>
                    <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>{project.services.length}</td>
                        <td>
                            <Link to={`/project/${project.id}/service`}>
                                View
                            </Link>
                        </td>
                    </tr>
                )}
                </tbody>
            </HTMLTable>
        </>
    );
});

export default Project;
