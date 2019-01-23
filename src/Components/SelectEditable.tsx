import "codemirror/lib/codemirror.css";
import * as React from "react";
import {
    Button,
    Card,
    ControlGroup,
    FormGroup,
    HTMLSelect,
    Icon,
    IFormGroupProps,
    Intent,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";
import {
    EditorConfiguration,
} from "codemirror";
import {
    observer,
} from "mobx-react-lite";
import {
    Controlled as CodeMirror,
    IDefineModeOptions,
} from "react-codemirror2";

import ErrorIcon from "@app/Components/FormErrorIcon";

type EntityObj = {
    type: string,
    name: string,
    description: string,
    readOnly: boolean,
    data: string,
}

type Props = {
    /** Default selected type */
    selected: string,
    allRecords: EntityObj[],
    /**
     * Non-editable records may have an "edit me" button in top-right corner.
     * If clicked, current non-editable record's data is copied to this target
     * record for live-editing.
     */
    editButtonTarget?: string,
    formGroupProps: IFormGroupProps,
    editorDefineMode?: IDefineModeOptions,
    editorProps: EditorConfiguration,
    selectOnChange: (type: string) => void,
    dataOnChange: (data: string) => void,
    /**
     * Validator for <HTMLSelect> element
     */
    validationError: string | undefined,
}

const SelectEditable = observer((props: Props) => {
    require(`codemirror/theme/${props.editorProps.theme}.css`);

    const [allRecords, setAllRecords] = React.useState(props.allRecords);

    const [current, setCurrent] = React.useState(
        allRecords.find(r => r.type === props.selected) as EntityObj,
    );

    const codeMirrorOptions = () => Object.assign(props.editorProps, {
        readOnly: current.readOnly,
    });

    const selectOnChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
        /**
         * Replace current type's data within allRecords
         */
        setAllRecords(prevState => {
            const newState = prevState;

            const currentInAllRecords = newState.find(record =>
                record.type === current.type,
            ) as EntityObj;

            newState[allRecords.indexOf(currentInAllRecords)].data = current.data;

            return newState;
        });

        const type = e.currentTarget.value;

        props.selectOnChange(type);

        setCurrent(allRecords.find(r => r.type === type) as EntityObj);
    };

    const dataOnChange = (data: string) => {
        props.dataOnChange(data);

        setCurrent(prevState => {
            return {...prevState, ...{data}};
        });
    };

    const editButtonOnClick = () => {
        if (!props.editButtonTarget) {
            return;
        }

        const currentData = current.data;
        const type = props.editButtonTarget;

        props.selectOnChange(type);

        const newType = allRecords.find(r => r.type === type) as EntityObj;

        setCurrent(prevState => {
            return {
                ...newType, ...{
                    data: currentData,
                },
            };
        });

        setAllRecords(prevState => {
            const newState = prevState;
            newState[allRecords.indexOf(newType)].data = currentData;

            return newState;
        });
    };

    return (
        <>
            <FormGroup
                {...props.formGroupProps}
                intent={props.validationError ? Intent.DANGER : undefined}
            >
                <ControlGroup fill>
                    <HTMLSelect
                        fill
                        value={current.type}
                        onChange={selectOnChange}
                    >
                        {allRecords.map(rec =>
                            <option key={rec.type} value={rec.type}>
                                {rec.name}
                            </option>,
                        )}
                    </HTMLSelect>

                    <ErrorIcon hasError={!!props.validationError} />
                </ControlGroup>

                <div className="helper-text">{props.validationError}</div>

                <p className="mt-2">
                    {current.description}
                </p>
            </FormGroup>

            <div className="CodeMirror-container">
                <CodeMirror
                    defineMode={props.editorDefineMode}
                    value={current.data}
                    options={codeMirrorOptions()}
                    onBeforeChange={(editor, data, value) => dataOnChange(value)}
                />

                {current.readOnly && props.editButtonTarget &&
                <div className="corner-text">
                    <Button
                        icon={IconNames.EDIT}
                        intent={Intent.PRIMARY}
                        onClick={editButtonOnClick}
                    >Customize Me</Button>
                </div>
                }

                {props.editButtonTarget
                && (current.type === props.editButtonTarget) &&
                <div className="corner-text">
                    <Card interactive={false} className="custom">
                        <Icon icon={IconNames.BUILD} /> Custom Config
                    </Card>
                </div>
                }
            </div>
        </>
    );
});

export default SelectEditable;
