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
import Toaster      from "@app/Components/Toaster";
import Service      from "@app/Entity/Service";
import Form         from "@app/Form/Service/PhpForm";
import StoreContext from "@app/Store";

type Props = RouteComponentProps<{ id?: string }> & {}

const Php = observer((props: Props) => {
    const stores = React.useContext(StoreContext);

    const [service] = React.useState(() => {
        return stores.serviceStore.find(props.match.params.id) as Service
    });

    // todo check service belongs to project
    if (!service || stores.projectStore.current !== service.project) {
        console.log(`Service ID ${props.match.params.id} not found`);

        stores.routingStore.push("/service");
    }

    const phpModules: ModuleI = modules[`v${service.version}`];

    const [form] = React.useState(() => {
        return new Form().fromService(service)
    });

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        const existing = stores.serviceStore.findByName(form.name.value);
        form.nameInUse.value = !!(existing && (existing.id !== service.id));

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

        stores.serviceStore.updateFromForm(service, form);
        stores.routingStore.push("/service");
    };

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

export default withRouter(Php);
