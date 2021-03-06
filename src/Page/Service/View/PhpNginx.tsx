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

import {
    IniFpm,
    IniPhp,
    IniXdebug,
    ModulePhp,
} from "@app/Components/Service/Php";
import {
    modules,
    ModuleI,
} from "@app/data/php";
import AppDetails    from "@app/Components/Service/AppDetails";
import NginxAppVhost from "@app/Components/Service/NginxAppVhost";
import UpdateSubmit  from "@app/Components/Service/UpdateSubmit";
import vhosts        from "@app/data/nginx";
import Service       from "@app/Entity/Service";
import Form          from "@app/Form/Service/PhpWebForm";
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

    const phpModules: ModuleI = modules[`v${service.version}`];
    const allVhosts = vhosts.filter(vhost => {
        return vhost.engine === "php" || vhost.engine === "none";
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
                        Composer comes pre-installed and is available
                        as <Code className="text-nowrap">$ composer</Code>.
                    </p>
                </div>
            </AppDetails>

            <Divider />

            <NginxAppVhost form={form} allVhosts={allVhosts}>
                <div className={Classes.TEXT_MUTED}>
                    <p>
                        The container comes with Nginx configs for several common PHP applications.
                        You can select one from the dropdown, or create your own custom config.
                    </p>

                    <p>
                        For more information about <Code>$cookie_XDEBUG_SESSION</Code> and&nbsp;
                        <Code>$my_fastcgi_pass</Code> you can read my blog post,&nbsp;
                        <a href="https://jtreminio.com/blog/all-in-one-php-fpm-nginx-apache-containers/"
                           target="_blank">All-in-One PHP-FPM + Nginx/Apache Containers</a>.
                    </p>
                </div>
            </NginxAppVhost>

            <Divider />

            <IniPhp form={form} />

            <Divider />

            <IniFpm form={form} />

            <Divider />

            <IniXdebug form={form} />

            <Divider />

            <ModulePhp form={form} allModules={phpModules} />

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
