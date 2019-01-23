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
} from "react-router-dom";

import StoreContext from "@app/Store";

type Props = {}

const List = observer((props: Props) => {
    const stores = React.useContext(StoreContext);

    const newOnClick = () => stores.routingStore.push("/service/create");

    return (
        <>
            <div className="page-header">
                <H1>Services</H1>
                <div className="page-options">
                    <AnchorButton
                        className="button"
                        rightIcon={IconNames.ADD}
                        intent={Intent.NONE}
                        onClick={newOnClick}
                    >
                        Add Service
                    </AnchorButton>
                </div>
            </div>

            {stores.projectStore.current.services.length > 0 &&
            <HTMLTable condensed className="w-100 mt-2">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {stores.projectStore.current.services.map(service =>
                    <tr key={service.id}>
                        <td>{service.name}</td>
                        <td>{service.type.name}</td>
                        <td>
                            <Link to={`/service/update/${service.type.slug}/${service.id}`}>
                                Update
                            </Link>
                        </td>
                    </tr>,
                )}
                </tbody>
            </HTMLTable>
            }

            {stores.projectStore.current.services.length === 0 &&
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

export default List;
