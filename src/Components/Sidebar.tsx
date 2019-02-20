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
    RouteComponentProps,
    withRouter,
} from "react-router-dom";
import _ from "underscore";

import ProjectCreate from "@app/Components/ProjectCreate";
import Project       from "@app/Entity/Project";
import Service       from "@app/Entity/Service";
import StoreContext  from "@app/Store";

type Props = RouteComponentProps<{ projectId: string }> & {}

const Sidebar = observer((props: Props) => {
    const stores = React.useContext(StoreContext);

    const currentProject = stores.projectStore.current
        || _.first(stores.projectStore.projects);
    const currentService = stores.serviceStore.current;

    const onLinkClick = (to: string) => stores.routingStore.push(to);

    return (
        <div id="sidebar">
            <nav className="top">
                <RenderProjectSection
                    currentProject={currentProject}
                    onLinkClick={onLinkClick}
                />
                <RenderServiceSection
                    currentProject={currentProject}
                    currentService={currentService}
                    onLinkClick={onLinkClick}
                />
            </nav>

            <nav className="bottom">
                <Divider />

                <ButtonGroup
                    minimal
                    large
                    fill
                    alignText={Alignment.LEFT}
                    className="mb-1"
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

type ProjectProp = {
    currentProject: Project | undefined,
    onLinkClick: (to: string) => void,
}

const RenderProjectSection = observer((props: ProjectProp) => {
    const stores = React.useContext(StoreContext);

    const [modalOpen, setModalOpen] = React.useState(false);

    const itemClick = (e: React.SyntheticEvent<HTMLSelectElement>) => {
        const project = stores.projectStore.find(e.currentTarget.value);

        if (project) {
            props.onLinkClick(`/project/${project.id}/service`);
        }
    };

    const handleSubmit = (project: Project) => {
        props.onLinkClick(`/project/${project.id}/service`);
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
                value={props.currentProject ? props.currentProject.id : undefined}
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

type ServiceProp = ProjectProp & {
    currentService: Service | undefined,
}

const RenderServiceSection = observer((props: ServiceProp) => {
    if (!props.currentProject) {
        return (
            <></>
        );
    }

    const basePath = `/project/${props.currentProject.id}/service`;

    return (
        <>
            <ControlGroup fill className="sidebar-group">
                <H2>Services</H2>
                <Button
                    minimal
                    small
                    icon={IconNames.ADD}
                    intent={Intent.PRIMARY}
                    onClick={() => props.onLinkClick(`${basePath}/create`)}
                    className={Classes.FIXED}
                    text="NEW"
                />
            </ControlGroup>

            <ButtonGroup
                minimal
                vertical
                large
                alignText={Alignment.LEFT}
                className="mb-3"
            >
                {props.currentProject.services.map(service =>
                    <RouterButton
                        key={service.id}
                        activeOnlyWhenExact
                        onClick={props.onLinkClick}
                        to={`${basePath}/${service.id}/${service.type.slug}`}
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
