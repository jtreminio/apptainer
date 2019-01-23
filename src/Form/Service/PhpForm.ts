import {
    FieldState,
    FormState,
} from "formstate";

import {
    ServiceAppFormI,
} from "@app/Types";
import {
    MaxLength,
    MinLength,
    Required,
} from "@app/Validator";
import Service     from "@app/Entity/Service";
import ServiceForm from "@app/Form/ServiceForm";

export default class PhpForm extends ServiceForm implements ServiceAppFormI {
    public appRoot = new FieldState("")
        .validators(value => {
            return Required({value}) ||
                MinLength({value, length: 2}) ||
                MaxLength({value, length: 128});
        });

    public php = new FieldState({});

    public fpm = new FieldState({});

    public xdebugEnabled = new FieldState(true);

    public xdebug = new FieldState({});

    public modules = new FieldState([""]);

    public form = new FormState({
        name: this.name,
        nameInUse: this.nameInUse,
        version: this.version,
        type: this.type,
        appRoot: this.appRoot,
        php: this.php,
        fpm: this.fpm,
        xdebugEnabled: this.xdebugEnabled,
        xdebug: this.xdebug,
        modules: this.modules,
    });

    public fromService = (service: Service) => {
        this.name.value = service.name;
        this.type.value = service.type;
        this.version.value = service.version;

        this.appRoot.value = service.meta.appRoot;
        this.php.value = service.meta.php;
        this.fpm.value = service.meta.fpm;
        this.xdebugEnabled.value = service.meta.xdebugEnabled;
        this.xdebug.value = service.meta.xdebug;
        this.modules.value = service.meta.modules;

        return this;
    };

    public toJson = () => ({
        appRoot: this.appRoot.$,
        php: this.php.$,
        fpm: this.fpm.$,
        xdebugEnabled: this.xdebugEnabled.$,
        xdebug: this.xdebug.$,
        modules: this.modules.$,
    });
}
