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
import UpdateSubmit  from "@app/Components/Service/UpdateSubmit";
import vhosts        from "@app/data/nginx";
import Service       from "@app/Entity/Service";
import Form          from "@app/Form/Service/NodeWebForm";
import StoreContext  from "@app/Store";

type Props = RouteComponentProps<{ projectId: string, serviceId: string }> & {}

const Update = observer((props: Props) => {
    const stores = React.useContext(StoreContext);

    const [service] = React.useState(() => {
        return stores.serviceStore.find(props.match.params.serviceId) as Service
    });

    const [form] = React.useState(() => {
        return new Form().fromService(service)
    });

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        await UpdateSubmit({e, form, service, stores});

        if (form.form.hasError) {
            return;
        }

        stores.routingStore.push(`/project/${props.match.params.projectId}/service`);
    };

    const allVhosts = vhosts.filter(vhost => {
        return vhost.engine === "node" || vhost.engine === "none";
    });

    return (
        <form className="service-form" onSubmit={onSubmit}>
            <div className="page-header">
                <H1>Update {form.type.value.name} "{form.name.value}" Service</H1>
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
                        Update Service
                    </Button>
                </div>
            </div>
        </form>
    );
});

export default withRouter(Update);
