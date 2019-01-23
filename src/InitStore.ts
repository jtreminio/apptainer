// import localForage  from "localforage";
import {
    configure,
} from "mobx";
import {
    create,
} from "mobx-persist";

import {
    stores,
} from "@app/Store";

configure({
    enforceActions: "observed",
});

const init = async () => {
    const hydrate = create({
        // storage: localForage,
        jsonify: true,
    });

    const storage = window.localStorage;

    await hydrate("ProjectStore", stores.projectStore, storage.ProjectStore)
        .then(() => {
            console.log("ProjectStore has been hydrated");

            /**
             * using `import Project from "@app/Entity/Project";`
             * loads and processes Project entity before `hydrate()`
             * has completed. Using conditional `require()` avoids this.
             */
            if (stores.projectStore.projects.length === 0) {
                const Project = require("@app/Entity/Project");
                const project = new Project.default();
                project.name = "Your Awesome Project";

                stores.projectStore.add(project);
                stores.projectStore.current = project;

                console.log("Initial Project created");
            }
        });

    await hydrate("ServiceStore", stores.serviceStore, storage.ServiceStore)
        .then(() => {
            console.log("ServiceStore has been hydrated")
        });

    return hydrate;
};

export default init;
