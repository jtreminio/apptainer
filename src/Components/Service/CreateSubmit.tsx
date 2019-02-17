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
import Form    from "@app/Form/ServiceForm";

type Props = {
    e: React.SyntheticEvent<HTMLFormElement>,
    form: Form,
    stores: typeof stores,
};

const CreateSubmit = async (props: Props) => {
    props.form.nameInUse.value = !!stores.serviceStore.findByName(props.form.name.value);

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

    stores.serviceStore.createFromForm(props.form);
};

export default CreateSubmit;
