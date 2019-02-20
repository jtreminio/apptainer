import * as React from "react";
import {
    AnchorButton,
    Button,
    ButtonGroup,
    Card,
    Elevation,
    FormGroup,
    HTMLSelect,
    Intent,
    Menu,
    MenuDivider,
    MenuItem,
    Popover,
    Position,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";
import {
    observer,
} from "mobx-react-lite";
import _ from "underscore";

import Project      from "@app/Entity/Project";
import ServiceType  from "@app/Entity/ServiceType";
import StoreContext from "@app/Store";

type Props = { project: Project }

const SelectCustom = observer((props: Props) => {
    const stores = React.useContext(StoreContext);

    const categories = ["All"].concat(...stores.serviceStore.serviceCategories());
    const serviceTypes = stores.serviceStore.serviceTypes();

    const [selectedCategory, setSelectedCategory] = React.useState("All");

    const categoryChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.currentTarget.value);
    };

    const filteredTypes: ServiceType[] = _.values(serviceTypes).filter(type => {
        if (selectedCategory === "All") {
            return true;
        }

        // @ts-ignore
        return type.category.indexOf(selectedCategory) !== -1;
    });

    const listServiceTypes = () => filteredTypes.map(serviceType => {
        const orgIcon = serviceType.organization === "official"
            ? IconNames.ENDORSED
            : IconNames.LINK;

        return (
            <div key={serviceType.image} className="service-box-container">
                <Card elevation={Elevation.TWO} className="card">
                    <div className="logo"><img src={serviceType.logo} /></div>

                    <h3>{serviceType.name}</h3>

                    <p className="description">{serviceType.description}</p>

                    <div className="button-group-container">
                        <ButtonGroup>
                            <AnchorButton
                                href={serviceType.url}
                                target="_blank"
                                icon={orgIcon}
                                minimal
                            >
                                {serviceType.organization}
                            </AnchorButton>
                        </ButtonGroup>

                        <ButtonGroup>
                            {defaultVersion(serviceType)}

                            {serviceType.versions.length > 1 &&
                            <Popover content={versionsMenu(serviceType)}
                                     position={Position.BOTTOM_RIGHT}>
                                <Button rightIcon={IconNames.CARET_DOWN}
                                        intent={Intent.PRIMARY} />
                            </Popover>
                            }
                        </ButtonGroup>
                    </div>
                </Card>
            </div>
        );
    });

    const basePath = `/project/${props.project.id}/service`;

    const defaultVersion = (serviceType: ServiceType) => {
        const versionIcon = serviceType.versions.length === 1
            ? IconNames.CARET_RIGHT
            : undefined;

        return (
            <AnchorButton
                key={`${serviceType.slug}-default`}
                icon={IconNames.TAG}
                rightIcon={versionIcon}
                intent={Intent.PRIMARY}
                onClick={() =>
                    stores.routingStore.push(
                        `${basePath}/create/${serviceType.slug}`
                    )
                }
            >
                Version {serviceType.versions[0]}
            </AnchorButton>
        );
    };

    const versionsMenu = (serviceType: ServiceType) =>
        <Menu>
            <MenuDivider title="Choose Version" />
            {serviceType.versions.map((version, key) =>
                <MenuItem
                    key={`${serviceType.slug}-${version}`}
                    text={`${version} ${key === 0 ? "(latest)" : ""}`}
                    onClick={() =>
                        stores.routingStore.push(
                            `${basePath}/create/${serviceType.slug}/${version}`
                        )
                    }
                />,
            )}
        </Menu>
    ;

    return (
        <>
            <div className="d-flex flex-row-reverse">
                <FormGroup inline label="Filter Categories:">
                    <HTMLSelect
                        fill
                        value={selectedCategory}
                        onChange={categoryChange}
                    >
                        {categories.map(category =>
                            <option key={category}>{category}</option>,
                        )}
                    </HTMLSelect>
                </FormGroup>
            </div>

            <div className="d-flex flex-wrap justify-content-around mt-5">
                {listServiceTypes()}
            </div>
        </>
    );
});

export default SelectCustom;
