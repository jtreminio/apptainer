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

import AppDetails    from "@app/Components/Service/AppDetails";
import NginxAppVhost from "@app/Components/Service/NginxAppVhost";
import Toaster       from "@app/Components/Toaster";
import vhosts        from "@app/data/nginx";
import Form          from "@app/Form/Service/NodeWebForm";
import StoreContext  from "@app/Store";

type Props = RouteComponentProps<{ version?: string }> & {}

const NodeNginx = observer((props: Props) => {
    const stores = React.useContext(StoreContext);
    const serviceTypeSlug = "nodejs-nginx";

    const sType = stores.serviceStore.getServiceTypeBySlug(serviceTypeSlug);
    const sName = stores.serviceStore.generateName(sType, "web");
    const sVersion = stores.serviceStore.matchVersion(sType, props.match.params.version);
    const allVhosts = vhosts.filter(vhost => {
        return vhost.engine === "node" || vhost.engine === "none";
    });

    const [form] = React.useState(() => {
        const vhost = vhosts.find(v => v.type === "node");

        return new Form().fromObj({
            name: sName,
            type: sType,
            version: sVersion,
            appRoot: "/path/to/app/root",
            vhost: "awesome.localhost",
            vhostType: vhost!.type,
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

            <AppDetails form={form}>
                <div className={Classes.TEXT_MUTED}>
                    <p>
                        Yarn comes pre-installed as a global package.
                    </p>
                </div>
            </AppDetails>

            <Divider />

            <NginxAppVhost form={form} allVhosts={allVhosts}>
                <div className={Classes.TEXT_MUTED}>
                    <p>
                        The default vhost config assumes your app has
                        a <Code>public</Code> directory and that it is started by
                        running <Code>app.js</Code>.
                    </p>

                    <p>
                        If either of the above do not match your app's requirements you can create
                        your own vhost config.
                    </p>

                    <p>
                        The base image is <a
                            href="https://hub.docker.com/r/phusion/passenger-nodejs"
                            target="_blank">
                                <Code>phusion/passenger-nodejs</Code></a> and
                        its <a href="https://www.phusionpassenger.com/docs/references/config_reference/nginx/"
                           target="_blank">configuration reference may be found here.</a>
                    </p>
                </div>
            </NginxAppVhost>

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

export default withRouter(NodeNginx);
