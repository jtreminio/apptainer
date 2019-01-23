import {
    FieldState,
    FormState,
} from "formstate";

import {
    ServiceAppVhostFormI,
} from "@app/Types";
import {
    MaxLength,
    MinLength,
    Required,
} from "@app/Validator";
import Service from "@app/Entity/Service";
import PhpForm from "@app/Form/Service/PhpForm";

export default class PhpWebForm extends PhpForm implements ServiceAppVhostFormI {
    public vhost = new FieldState("")
        .validators(value => {
            return Required({value}) ||
                MinLength({value, length: 3}) ||
                MaxLength({value, length: 50});
        });

    public vhostType = new FieldState("")
        .validators(value => {
            return Required({value});
        });

    public vhostData = new FieldState("");

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
        vhost: this.vhost,
        vhostType: this.vhostType,
        vhostData: this.vhostData,
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

        this.vhost.value = service.meta.vhost;
        this.vhostType.value = service.meta.vhostType;
        this.vhostData.value = service.meta.vhostData;

        return this;
    };

    public toJson = () => ({
        appRoot: this.appRoot.$,
        php: this.php.$,
        fpm: this.fpm.$,
        xdebugEnabled: this.xdebugEnabled.$,
        xdebug: this.xdebug.$,
        modules: this.modules.$,
        vhost: this.vhost.$,
        vhostType: this.vhostType.$,
        vhostData: this.vhostData.$,
    });
}
