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
import AppDetails   from "@app/Components/Service/AppDetails";
import UpdateSubmit from "@app/Components/Service/UpdateSubmit";
import Service      from "@app/Entity/Service";
import Form         from "@app/Form/Service/PhpForm";
import StoreContext from "@app/Store";

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
