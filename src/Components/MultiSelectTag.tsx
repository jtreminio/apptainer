import * as React from "react";
import {
    ITagProps,
    MenuItem,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";
import {
    ItemPredicate,
    ItemRenderer,
    MultiSelect,
} from "@blueprintjs/select";
import {
    observer,
} from "mobx-react-lite";

const Select = MultiSelect.ofType<string>();

type Props = {
    data: string[],
    selected: string[],
    onSelect: (items: string[]) => void,
    labelFormat?: (name: string) => string,
    nameFormat?: (name: string) => string,
}

const MultiSelectTag = observer((props: Props) => {
    const tagProps: ITagProps = {
        minimal: false,
    };

    const tagRenderer = (item: string) => item;

    const itemPredicate: ItemPredicate<string> = (query, item) =>
        item.toLowerCase().indexOf(query.toLowerCase()) >= 0
    ;

    const itemRenderer: ItemRenderer<string> = (item, {modifiers, handleClick}) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }

        return (
            <MenuItem
                active={modifiers.active}
                icon={isSelected(item) ? IconNames.TICK : IconNames.BLANK}
                key={item}
                label={labelFormat(item)}
                onClick={handleClick}
                text={nameFormat(item)}
                shouldDismissPopover={false}
            />
        );
    };

    const onRemove = (item: string, index: number) => deleteSelected(item);

    const getSelectedIndex = (item: string) => props.selected.indexOf(item);

    const isSelected = (item: string) => getSelectedIndex(item) !== -1;

    const addSelected = (item: string) => {
        if (props.selected.indexOf(item) !== -1) {
            return;
        }

        props.onSelect(props.selected.concat([item]));
    };

    const deleteSelected = (item: string) => {
        const selected = props.selected.filter(i => item !== i);

        props.onSelect(selected);
    };

    const handleFilmSelect = (item: string) => {
        if (!isSelected(item)) {
            addSelected(item);

            return;
        }

        deleteSelected(item);
    };

    const labelFormat = (name: string): undefined | string => {
        return props.labelFormat === undefined
            ? undefined
            : props.labelFormat(name);
    };

    const nameFormat = (name: string): string => {
        return props.nameFormat === undefined
            ? name
            : props.nameFormat(name);
    };

    // Only show non-selected items in dropdown
    const displayItems = (a: string[], b: string[]) => {
        return [
            ...a.filter(x => b.indexOf(x) === -1),
            ...b.filter(x => a.indexOf(x) === -1),
        ];
    };

    return (
        <Select
            className="multi-select-tag"
            items={displayItems(props.data, props.selected)}
            itemPredicate={itemPredicate}
            itemRenderer={itemRenderer}
            initialContent={undefined}
            noResults={<MenuItem disabled={true} text="No results." />}
            onItemSelect={handleFilmSelect}
            popoverProps={{minimal: true, usePortal: false}}
            resetOnQuery
            resetOnSelect
            selectedItems={props.selected}
            tagRenderer={tagRenderer}
            tagInputProps={{tagProps, onRemove}}
        />
    );
});

export default MultiSelectTag;
