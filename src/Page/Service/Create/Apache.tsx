import * as React from "react";
import {
    Button,
    Classes,
    Code,
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

import ApacheVhost  from "@app/Components/Service/ApacheVhost";
import AppDetails   from "@app/Components/Service/AppDetails";
import CreateSubmit from "@app/Components/Service/CreateSubmit";
import vhosts       from "@app/data/apache";
import Form         from "@app/Form/Service/WebServerForm";
import StoreContext from "@app/Store";

type Props = RouteComponentProps<{ projectId: string, version?: string }> & {}

const Create = observer((props: Props) => {
    const stores = React.useContext(StoreContext);
    const serviceTypeSlug = "apache";

    const sType = stores.serviceStore.getServiceTypeBySlug(serviceTypeSlug);
    const sName = stores.serviceStore.generateName(sType, "web");
    const sVersion = stores.serviceStore.matchVersion(sType, props.match.params.version);

    const [form] = React.useState(() => {
        const vhost = vhosts.find(v => v.type === "html");

        return new Form().fromObj({
            name: sName,
            type: sType,
            version: sVersion,
            appRoot: "/path/to/app/root",
            vhost: "awesome.localhost",
            vhostData: vhost!.data,
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

            <AppDetails form={form} />

            <Divider />

            <ApacheVhost form={form}>
                <div className={Classes.TEXT_MUTED}>
                    <p>
                        Leave <Code>ServerName default.localhost</Code> as-is in the config.
                        Instead, change the <Code>Server Hostname</Code> field to the right.
                    </p>
                </div>
            </ApacheVhost>

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
