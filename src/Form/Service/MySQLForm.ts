import {
    FieldState,
    FormState,
} from "formstate";

import {
    ServiceSqlFormI,
} from "@app/Types";
import {
    MaxLength,
    MinLength,
    Required,
} from "@app/Validator";
import Service     from "@app/Entity/Service";
import ServiceForm from "@app/Form/ServiceForm";

export default class MySQLForm extends ServiceForm implements ServiceSqlFormI {
    public dbName = new FieldState("")
        .validators(value => {
            return Required({value}) ||
                MinLength({value, length: 2}) ||
                MaxLength({value, length: 128});
        });

    public dbUser = new FieldState("")
        .validators(value => {
            return Required({value}) ||
                MinLength({value, length: 2}) ||
                MaxLength({value, length: 128});
        });

    public dbPw = new FieldState("")
        .validators(value => {
            return Required({value}) ||
                MinLength({value, length: 2}) ||
                MaxLength({value, length: 128});
        });

    public form = new FormState({
        name: this.name,
        nameInUse: this.nameInUse,
        version: this.version,
        type: this.type,
        dbName: this.dbName,
        dbUser: this.dbUser,
        dbPw: this.dbPw,
    });

    public fromService = (service: Service) => {
        this.name.value = service.name;
        this.type.value = service.type;
        this.version.value = service.version;

        this.dbName.value = service.meta.dbName;
        this.dbUser.value = service.meta.dbUser;
        this.dbPw.value = service.meta.dbPw;

        return this;
    };

    public toJson = () => ({
        dbName: this.dbName.$,
        dbUser: this.dbUser.$,
        dbPw: this.dbPw.$,
    });
}
