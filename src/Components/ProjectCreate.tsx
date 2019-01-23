import * as React from "react";
import {
    Button,
    Classes,
    FormGroup,
    InputGroup,
    Intent,
} from "@blueprintjs/core";
import {
    observer,
} from "mobx-react-lite";

import Form         from "@app/Form/ProjectForm";
import StoreContext from "@app/Store";

type Props = {
    handleSubmit: () => void,
}

const ProjectCreate = observer((props: Props) => {
    const stores = React.useContext(StoreContext);
    const [form] = React.useState(new Form());

    const nameOnChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        form.name.onChange(e.currentTarget.value);
    };

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        await form.onSubmit(e);

        if (!form.form.hasError) {
            stores.projectStore.current = stores.projectStore.createFromForm(form);

            props.handleSubmit();
        }
    };

    return (
        <form className="create-project" onSubmit={onSubmit}>
            <div className={Classes.DIALOG_BODY}>
                <FormGroup
                    label="Project Name"
                    labelFor="project-name"
                    labelInfo="*"
                    intent={form.name.error ? Intent.DANGER : undefined}
                >
                    <InputGroup
                        id="project-name"
                        placeholder="Enter Project Name"
                        intent={form.name.error ? Intent.DANGER : undefined}
                        value={form.name.value}
                        onChange={nameOnChange}
                    />

                    <div className="helper-text">{form.name.error}</div>

                    <p className="mt-2">
                        Projects help you organize your Services.
                    </p>

                    <p className="mt-2">
                        All Services within each Project will be completely isolated
                        from Services in other Projects.
                    </p>
                </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button intent={Intent.SUCCESS} type="submit">
                        Create Project
                    </Button>
                </div>
            </div>
        </form>
    )
});

export default ProjectCreate;
