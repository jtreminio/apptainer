import * as React from "react";
import {
    AnchorButton,
    H1,
    HTMLTable,
    Intent,
    NonIdealState,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";
import {
    observer,
} from "mobx-react-lite";
import {
    Link,
    RouteComponentProps,
    withRouter,
} from "react-router-dom";

import Project      from "@app/Entity/Project";
import StoreContext from "@app/Store";

type Props = RouteComponentProps<{ projectId: string }> & {}

const List = observer((props: Props) => {
    const stores = React.useContext(StoreContext);

    const [project] = React.useState(() => {
        return stores.projectStore.find(props.match.params.projectId) as Project;
    });

    const basePath = `/project/${project.id}/service`;

    const newOnClick = () => {
        return stores.routingStore.push(`${basePath}/create`);
    };

    return (
        <>
            <div className="page-header">
                <H1>Services</H1>
            </div>

            {project.services.length > 0 &&
            <HTMLTable condensed className="w-100 mt-2">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {project.services.map(service =>
                    <tr key={service.id}>
                        <td>{service.name}</td>
                        <td>{service.type.name}</td>
                        <td>
                            <Link to={`${basePath}/${service.id}/${service.type.slug}`}>
                                Update
                            </Link>
                        </td>
                    </tr>,
                )}
                </tbody>
            </HTMLTable>
            }

            {project.services.length === 0 &&
            <NonIdealState
                icon={IconNames.LAYERS}
                title="No Services found"
                description={<p>Click below to add your first Service!</p>}
                action={
                    <AnchorButton
                        className="button"
                        rightIcon={IconNames.CARET_RIGHT}
                        intent={Intent.PRIMARY}
                        onClick={newOnClick}
                    >
                        Add Service
                    </AnchorButton>
                }
            />
            }
        </>
    );
});

export default withRouter(List);
