import {
    Validator,
} from "formstate";

type Options = {
    value: string | null | undefined,
    message?: string,
}

const Required: Validator<Options> = ({value, message}) => {
    message = message || "Value required";

    if (value == null || !value.trim()) {
        return message;
    }

    return null;
};

export default Required;
