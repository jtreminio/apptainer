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

import CreateSubmit from "@app/Components/Service/CreateSubmit";
import MySQLDetails from "@app/Components/Service/MySQLDetails";
import Form         from "@app/Form/Service/MySQLForm";
import StoreContext from "@app/Store";

type Props = RouteComponentProps<{ projectId: string, version?: string }> & {}

const Create = observer((props: Props) => {
    const stores = React.useContext(StoreContext);
    const serviceTypeSlug = "mysql";

    const sType = stores.serviceStore.getServiceTypeBySlug(serviceTypeSlug);
    const sName = stores.serviceStore.generateName(sType, "db");
    const sVersion = stores.serviceStore.matchVersion(sType, props.match.params.version);

    const [form] = React.useState(() => {
        return new Form().fromObj({
            name: sName,
            type: sType,
            version: sVersion,
            dbName: 'my_database',
            dbUser: 'my_user',
            dbPw: '123',
        })
    });

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        await CreateSubmit({e, form, stores});

        if (form.form.hasError) {
            return;
        }

        stores.routingStore.push(`/project/${props.match.params.projectId}/service`);
    };

    return (
        <form className="service-form" onSubmit={onSubmit}>
            <div className="page-header">
                <H1>Create New {form.type.value.name} Service</H1>
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
                        Create Service
                    </Button>
                </div>
            </div>
        </form>
    );
});

export default withRouter(Create);
