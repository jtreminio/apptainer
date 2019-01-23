import * as React from "react";
import {
    Alignment,
    AnchorButton,
    Button,
    ButtonGroup,
    Classes,
    ControlGroup,
    Dialog,
    Divider,
    H2,
    HTMLSelect,
    InputGroup,
    Intent,
} from "@blueprintjs/core";
import {
    IconName,
    IconNames,
} from "@blueprintjs/icons";
import {
    observer,
} from "mobx-react-lite";
import {
    Route,
    withRouter,
} from "react-router-dom";

import ProjectCreate from "@app/Components/ProjectCreate";
import StoreContext  from "@app/Store";

type Props = {}

const Sidebar = observer((props: Props) => {
    const stores = React.useContext(StoreContext);

    const onLinkClick = (to: string) => stores.routingStore.push(to);

    return (
        <div id="sidebar">
            <nav className="top">
                <RenderProjectSection onLinkClick={onLinkClick} />
                <RenderServiceSection onLinkClick={onLinkClick} />
            </nav>

            <nav className="bottom">
                <Divider />

                <ButtonGroup
                    minimal
                    vertical
                    large
                    fill
                    alignText={Alignment.LEFT}
                >
                    <RouterButton
                        activeOnlyWhenExact
                        onClick={onLinkClick}
                        to="/"
                        icon={IconNames.HOME}
                    >
                        Home
                    </RouterButton>
                </ButtonGroup>

                <InputGroup
                    large
                    leftIcon={IconNames.SEARCH}
                    placeholder="Search..."
                    className="mx-1 mb-2"
                />
            </nav>
        </div>
    );
});

type RouteLinkProp = {
    onLinkClick: (to: string) => void,
}

const RenderProjectSection = observer((props: RouteLinkProp) => {
    const stores = React.useContext(StoreContext);

    const [modalOpen, setModalOpen] = React.useState(false);

    const itemClick = (e: React.SyntheticEvent<HTMLSelectElement>) => {
        const project = stores.projectStore.find(e.currentTarget.value);

        if (project) {
            stores.projectStore.current = project;
            props.onLinkClick("/service");
        }
    };

    const handleSubmit = () => {
        props.onLinkClick("/service");
        handleClose();
    };

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return (
        <>
            <ControlGroup fill className="sidebar-group">
                <H2>Project</H2>
                <Button
                    minimal
                    small
                    icon={IconNames.ADD}
                    intent={Intent.PRIMARY}
                    onClick={handleOpen}
                    className={Classes.FIXED}
                    text="NEW"
                />
            </ControlGroup>

            <HTMLSelect
                large
                value={stores.projectStore.current.id}
                onChange={itemClick}
                className="mb-3 mx-1"
            >
                {stores.projectStore.projects.map(project =>
                    <option key={project.id} value={project.id}>{project.name}</option>,
                )}
            </HTMLSelect>

            <Dialog
                title="Create New Project"
                onClose={handleClose}
                isOpen={modalOpen}
            >
                <ProjectCreate
                    handleSubmit={handleSubmit}
                />
            </Dialog>
        </>
    )
});

const RenderServiceSection = observer((props: RouteLinkProp) => {
    const stores = React.useContext(StoreContext);

    return (
        <>
            <ControlGroup fill className="sidebar-group">
                <H2>Services</H2>
                <Button
                    minimal
                    small
                    icon={IconNames.ADD}
                    intent={Intent.PRIMARY}
                    onClick={() => props.onLinkClick("/service/create")}
                    className={Classes.FIXED}
                    text="NEW"
                />
            </ControlGroup>

            <ButtonGroup
                minimal
                vertical
                large
                fill
                alignText={Alignment.LEFT}
                className="mb-3"
            >
                {stores.projectStore.current.services.map(service =>
                    <RouterButton
                        key={service.id}
                        activeOnlyWhenExact
                        onClick={props.onLinkClick}
                        to={`/service/update/${service.type.slug}/${service.id}`}
                        icon={IconNames.LAYERS}
                        intent={Intent.PRIMARY}
                    >
                        {service.name}
                        <span className="small-text">{service.type.name}</span>
                    </RouterButton>
                )}
            </ButtonGroup>
        </>
    )
});

type LinkProps = {
    activeOnlyWhenExact: boolean,
    onClick: (to: string) => void,
    to: string,
    children?: React.ReactNode,
    icon?: IconName,
    intent?: Intent,
}

const RouterButton = (props: LinkProps) =>
    <Route
        path={props.to}
        exact={props.activeOnlyWhenExact}
        children={({match}: { match: boolean }) =>
            <AnchorButton
                active={match}
                className="button"
                icon={props.icon}
                intent={match ? props.intent : undefined}
                onClick={() => props.onClick(props.to)}
            >
                {props.children}
            </AnchorButton>
        }
    />
;

export default withRouter(Sidebar);
