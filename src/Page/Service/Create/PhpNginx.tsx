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
    ini,
    modules,
    ModuleI,
} from "@app/data/php";
import AppDetails    from "@app/Components/Service/AppDetails";
import CreateSubmit  from "@app/Components/Service/CreateSubmit";
import NginxAppVhost from "@app/Components/Service/NginxAppVhost";
import vhosts        from "@app/data/nginx";
import Form          from "@app/Form/Service/PhpWebForm";
import StoreContext  from "@app/Store";

type Props = RouteComponentProps<{ version?: string }> & {}

const Create = observer((props: Props) => {
    const stores = React.useContext(StoreContext);
    const serviceTypeSlug = "php-nginx";

    const sType = stores.serviceStore.getServiceTypeBySlug(serviceTypeSlug);
    const sName = stores.serviceStore.generateName(sType, "web");
    const sVersion = stores.serviceStore.matchVersion(sType, props.match.params.version);
    const phpModules: ModuleI = modules[`v${sVersion}`];
    const allVhosts = vhosts.filter(vhost => {
        return vhost.engine === "php" || vhost.engine === "none";
    });

    const [form] = React.useState(() => {
        const vhost = vhosts.find(v => v.type === "fpm");

        return new Form().fromObj({
            name: sName,
            type: sType,
            version: sVersion,
            appRoot: "/path/to/app/root",
            php: ini.php.selected,
            fpm: ini.fpm.selected,
            xdebug: ini.xdebug.selected,
            modules: phpModules.selected,
            vhost: "awesome.localhost",
            vhostType: vhost!.type,
            vhostData: vhost!.data,
        })
    });

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        await CreateSubmit({e, form, stores});

        if (form.form.hasError) {
            return;
        }

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
                        Create Service
                    </Button>
                </div>
            </div>
        </form>
    );
});

export default withRouter(Create);
