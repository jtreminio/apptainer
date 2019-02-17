import * as React from "react";
import {
    Button,
    Classes,
    Divider,
    H1,
    Intent,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";
import {
    observer,
} from "mobx-react-lite";
import {
    RouteComponentProps,
    withRouter,
} from "react-router-dom";

import MySQLDetails from "@app/Components/Service/MySQLDetails";
import UpdateSubmit from "@app/Components/Service/UpdateSubmit";
import Service      from "@app/Entity/Service";
import Form         from "@app/Form/Service/MySQLForm";
import StoreContext from "@app/Store";

type Props = RouteComponentProps<{ id?: string }> & {}

const Update = observer((props: Props) => {
    const stores = React.useContext(StoreContext);

    const [service] = React.useState(() => {
        return stores.serviceStore.find(props.match.params.id) as Service
    });

    // todo check service belongs to project
    if (!service || stores.projectStore.current !== service.project) {
        console.log(`Service ID ${props.match.params.id} not found`);

        stores.routingStore.push("/service");
    }

    const [form] = React.useState(() => {
        return new Form().fromService(service)
    });

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        await UpdateSubmit({e, form, service, stores});

        if (form.form.hasError) {
            return;
        }

        stores.routingStore.push("/service");
    };

    return (
        <form className="service-form" onSubmit={onSubmit}>
            <div className="page-header">
                <H1>Update {form.type.value.name} Service</H1>
                <div className="page-subtitle">
                    <a href={form.type.value.url}
                       target="_blank">{form.type.value.image}:{form.version.value}</a>
                </div>
            </div>

            <MySQLDetails form={form}>
                <div className={Classes.TEXT_MUTED}>
                    <p>
                        A persistent volume will be created. Your database will
                        not lose data if you destroy its container.
                    </p>
                </div>
            </MySQLDetails>

            <Divider />

            <div className="row">
                <div className="col text-right">
                    <Button
                        type="submit"
                        rightIcon={IconNames.PLUS}
                        intent={Intent.SUCCESS}
                    >
                        Update Service
                    </Button>
                </div>
            </div>
        </form>
    );
});

export default withRouter(Update);
