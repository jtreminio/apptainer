import * as React from "react";
import {
    Intent,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";

import {
    stores,
} from "@app/Store";
import Toaster from "@app/Components/Toaster";
import Service from "@app/Entity/Service";
import Form    from "@app/Form/ServiceForm";

type Props = {
    e: React.SyntheticEvent<HTMLFormElement>,
    form: Form,
    service: Service,
    stores: typeof stores,
};

const UpdateSubmit = async (props: Props) => {
    const existing = props.stores.serviceStore.findByName(props.form.name.value);
    props.form.nameInUse.value = !!(existing && (existing.id !== props.service.id));

    await props.form.onSubmit(props.e);

    if (props.form.form.hasError) {
        console.log(`Form errors: ${props.form.form.error}`);

        Toaster.show({
            icon: IconNames.ERROR,
            intent: Intent.DANGER,
            message: "The form has errors. Please double check and try again.",
        });

        return;
    }

    stores.serviceStore.updateFromForm(props.service, props.form);
};

export default UpdateSubmit;
