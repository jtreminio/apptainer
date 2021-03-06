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
import AppDetails   from "@app/Components/Service/AppDetails";
import CreateSubmit from "@app/Components/Service/CreateSubmit";
import Form         from "@app/Form/Service/PhpForm";
import StoreContext from "@app/Store";

type Props = RouteComponentProps<{ projectId: string, version?: string }> & {}

const Create = observer((props: Props) => {
    const stores = React.useContext(StoreContext);
    const serviceTypeSlug = "php";

    const sType = stores.serviceStore.getServiceTypeBySlug(serviceTypeSlug);
    const sName = stores.serviceStore.generateName(sType, serviceTypeSlug);
    const sVersion = stores.serviceStore.matchVersion(sType, props.match.params.version);
    const phpModules: ModuleI = modules[`v${sVersion}`];

    const [form] = React.useState(() => {
        return new Form().fromObj({
            name: sName,
            type: sType,
            version: sVersion,
            appRoot: "/path/to/app/root",
            php: ini.php.selected,
            fpm: ini.fpm.selected,
            xdebug: ini.xdebug.selected,
            modules: phpModules.selected,
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

            <AppDetails form={form}>
                <div className={Classes.TEXT_MUTED}>
                    <p>
                        Composer comes pre-installed and is available
                        as <Code className="text-nowrap">$ composer</Code>.
                    </p>
                </div>
            </AppDetails>

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
