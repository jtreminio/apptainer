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

import AppDetails   from "@app/Components/Service/AppDetails";
import Command      from "@app/Components/Service/Node/Command";
import Toaster      from "@app/Components/Toaster";
import Form         from "@app/Form/Service/NodeForm";
import StoreContext from "@app/Store";

type Props = RouteComponentProps<{ version?: string }> & {}

const Node = observer((props: Props) => {
    const stores = React.useContext(StoreContext);
    const serviceTypeSlug = "nodejs";

    const sType = stores.serviceStore.getServiceTypeBySlug(serviceTypeSlug);
    const sName = stores.serviceStore.generateName(sType, "node");
    const sVersion = stores.serviceStore.matchVersion(sType, props.match.params.version);

    const [form] = React.useState(() => {
        return new Form().fromObj({
            name: sName,
            type: sType,
            version: sVersion,
            appRoot: "/path/to/app/root",
            command: "yarn run start",
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

            <AppDetails form={form}>
                <div className={Classes.TEXT_MUTED}>
                    <p>
                        Yarn comes pre-installed as a global package.
                    </p>
                </div>
            </AppDetails>

            <Divider />

            <Command form={form} />

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

export default withRouter(Node);
