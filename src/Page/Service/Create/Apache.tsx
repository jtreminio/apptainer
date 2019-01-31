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

import AppDetails   from "@app/Components/Service/AppDetails";
import ApacheVhost  from "@app/Components/Service/ApacheVhost";
import Toaster      from "@app/Components/Toaster";
import vhosts       from "@app/data/apache";
import Form         from "@app/Form/Service/WebServerForm";
import StoreContext from "@app/Store";

type Props = RouteComponentProps<{ version?: string }> & {}

const Apache = observer((props: Props) => {
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
        form.nameInUse.value = !!stores.serviceStore.findByName(form.name.value);

        await form.onSubmit(e);

        if (form.form.hasError) {
            console.log(`Form errors: ${form.form.error}`);

            Toaster.show({
                icon: IconNames.ERROR,
                intent: Intent.DANGER,
                message: "The form has errors. Please double check and try again.",
            });

            return;
        }

        stores.serviceStore.createFromForm(form);
        stores.routingStore.push("/service");
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

export default withRouter(Apache);
